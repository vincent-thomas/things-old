pub fn core_use_flag(name: &'static str, args: &[(String, String)]) -> Option<String> {
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

use crate::command::Command;
use crate::conf::ProgramOptions;

pub fn core_use_help(commands: Vec<Command>, options: ProgramOptions) {
  let longest_c_name = commands
    .iter()
    .map(|value| { value.name.len() })
    .max()
    .expect("No commands found in vec");
  let prog_name = if std::env::consts::OS == "windows" {
    format!("{}.exe", options.name)
  } else {
    options.name.to_string()
  };

  let mut help_text: Vec<String> = vec![format!("{} v{}\n{}\n", prog_name, options.version, options.description)];
  if options.usage.is_some() {
    help_text.push(format!("Usage: {} {}\n", prog_name, options.usage.unwrap()));
  }
  help_text.push("Commands:\n".to_string());
  commands.iter().for_each(|command| {
    help_text.push(
      format!("{:width$} - {}{usage}{note}", command.name, command.description,
        width = longest_c_name,
        usage = if command.usage.is_some() {
          format!(", Usage: {}", command.usage.unwrap())
        } else {
          "".to_string()
        },
        note = if command.help_string.is_some() {
          format!(", Note: {}", command.help_string.unwrap())
        } else {
          "".to_string()
        }
      )
    );
  });
  println!("{}\n", help_text.join("\n"));
  std::process::exit(0);
}

