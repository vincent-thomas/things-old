pub mod builder;
pub mod conf;
pub mod help;
pub mod command;

use help::use_help;

use command::Command;
use conf::{ProgramOptions, Spacing};
#[cfg(feature = "hooks")]
pub mod hooks;




#[derive(Debug, Clone)]
pub struct CliApp {
  app_options: ProgramOptions,
  spacing: Spacing,
  commands: Vec<Command>,
  args: Vec<String>,
}

impl CliApp {
  pub fn spacing(mut self, spacing: Spacing) -> Self {
    self.spacing = spacing; 
    self
  }
}

#[derive(Debug)]
struct Formatting {}

#[derive(Debug)]
enum Error {
  FormattingError(Formatting)
}

impl CliApp {

  fn remove_flags(self, args: Vec<String>) -> Vec<String> {
    args.iter().filter(|value| !value.starts_with("-")).map(|value| value.to_string()).collect::<Vec<String>>()
  }


  fn format_commands(self) -> Result<Vec<String>, Error> {
    let mut args = self.clone().args;
    let maybe_ex = args.get(0).unwrap();
    let is_ex = std::path::Path::exists(std::path::Path::new(maybe_ex));
    if is_ex {
      args.remove(0);
    }

    let seperator = match self.spacing {
      Spacing::Dots => ':',
      Spacing::Space => ' ',
      Spacing::Dot => '.',
      Spacing::Custom(c) => c
    }.to_string();

    let result = self.clone().remove_flags(args).join(" ");
    let commands = result.split(seperator.as_str()).map(String::from).collect::<Vec<String>>();

    for item in &commands {
      if item.contains(" ") {
        return Err(Error::FormattingError(Formatting {}));
      }
    }
    return Ok(commands);
  }

  fn format_flags(self) -> Vec<(String, String)>{
    self.args.iter().filter(|value| {
      value.starts_with("--")
    }).map(|flag| {flag.replace("--", "")}).map(|value| {
      let is_splittable = value.contains("=");

      if !is_splittable {
        return (value.to_string(), "true".to_string());
      }
      let iter = value.split("=").into_iter().collect::<Vec<&str>>();
      (iter.get(0).unwrap().to_string(), iter.get(1).unwrap().to_string())
    }).collect::<Vec<(String, String)>>()
  }

  fn internal_use_flag(self, name: &'static str, args: &[(String, String)]) -> Option<String> {
    let mut flag_keys = vec![];

    for item in args.clone() {
      flag_keys.push(item.0.clone());
    };

    let is_there = flag_keys.contains(&name.to_string());

    if !is_there {
      return None;
    }

    let mut index_name: Option<usize> = None;

    for (index, item) in flag_keys.iter().enumerate() {
      if item == name {
        index_name = Some(index);
      }
    }

    let selected_flag = args.get(index_name.unwrap()).unwrap().to_owned();

    Some(selected_flag.1)
  }

  pub fn run(self) {
    let commands = self.clone().format_commands().unwrap();
    let flags = self.clone().format_flags();
    let is_help = self.clone().internal_use_flag("help", &flags).unwrap_or("false".to_string());
    let mut the_command: Option<Command> = None;
    self.clone().commands.iter().for_each(|command| {
      if commands.get(0).unwrap() == command.name {
        the_command = Some(command.clone());
      }
    });
    if is_help == "true" || the_command.is_none() {
      use_help(self.clone().commands, self.clone().app_options);
    }
    (the_command.unwrap().handler)(commands.clone(), flags.clone());
  }
}