use crate::helpers::use_flag;
use crate:: print_help;

type Handler = fn(commands: Vec<String>);

#[derive(Debug, Clone)]
pub struct NewCommand {
  name: &'static str,
  help_string: Option<&'static str>,
  handler: Handler,
  description: Option<&'static str>,
  usage: Option<&'static str>
}

#[derive(Debug, Clone)]
pub struct Command {
  pub name: &'static str,
  pub help_string: Option<&'static str>,
  handler: Handler,
  pub description: &'static str,
  pub usage: Option<&'static str>
}

impl NewCommand {
  pub fn new(name: &'static str, handler: Handler) -> Self {
    return Self {
      name,
      description: None,
      handler,
      help_string: None,
      usage: None
    }
  }
  pub fn description(mut self, description: &'static str) -> Self {
    self.description = Some(description);
    self
  }
  pub fn usage(mut self, usage: &'static str) -> Self {
    self.usage = Some(usage);
    self
  }
  pub fn help_string(mut self, string: &'static str) -> Self {
    self.help_string = Some(string);
    self
  }
  pub fn build(self) -> Command {
    Command {
      name: self.name,
      description: self.description.unwrap(),
      handler: self.handler,
      help_string: self.help_string,
      usage: self.usage
    }
  }
}

pub struct RunOptions {
  pub program_name: &'static str,
  pub version: &'static str,
  pub description: &'static str,
}

pub fn run(commands: Vec<Command>, args: Vec<String>, options: RunOptions) {
  let is_help = use_flag("help", &args).unwrap_or("false".to_string());
  let mut the_command: Option<Command> = None;

  commands.iter().for_each(|command| {
    if *args.get(0).unwrap() == command.name {
      the_command = Some(command.clone());
    }
  });
  if is_help == "true" || the_command.is_none() {
    print_help(commands, options);
    std::process::exit(0);
  }
  let command_args = args[1..].to_vec();
  (the_command.unwrap().handler)(command_args);
}