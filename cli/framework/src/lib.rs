
mod prelude;
pub mod utils;
pub mod helpers;
pub mod commands;
use commands::register::{Command, RunOptions};
use thiserror::Error;
use crate::prelude::*;

#[derive(PartialEq)]
pub enum CommandSpacer {
  Dots,
  Space,
  Dot,
  Custom(char)
}

#[derive(Error)]
#[derive(Debug)]
pub enum CommandError {
  #[error("Wrong format")]
  WrongFormat,
  #[error("Invalid input")]
  InvalidInput
}

pub struct FormatOptions {
  pub spacer: CommandSpacer,
  pub validate_format: bool
}

pub fn print_help(commands: Vec<Command>, options: RunOptions) {
    let longest_c_name = commands
    .iter()
    .map(|value| { value.name.len() })
    .max()
    .expect("No commands found in vec");

  let mut help_text: Vec<String> = vec![f!("{} v{}\n{}\n", options.program_name, options.version, options.description), "Commands:\n".to_string()];
  // let commands = format_commands(args.as_str(), FormatOptions { spacer, validate_format: false });
  commands.iter().for_each(|command| {
    help_text.push(
      f!("{:width$} - {}{usage}{note}", command.name, command.description,
        width = longest_c_name,
        usage = if command.usage.is_some() {
          f!(", Usage: {}", command.usage.unwrap())
        } else {
          "".to_string()
        },
        note = if command.help_string.is_some() {
          f!(", Note: {}", command.help_string.unwrap())
        } else {
          "".to_string()
        }
      )
    );
  });
    println!("{}", help_text.join("\n"));
    std::process::exit(0);
  }