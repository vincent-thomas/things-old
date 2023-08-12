mod ping;

use framework::commands::{run, register::{Command, NewCommand, RunOptions}};
use crate::commands::ping::command as healthcheck_command;

fn get_commands() -> Vec<Command> {
  vec![
    NewCommand::new(
      "ping",
      healthcheck_command
    ).description("To check if api is up").usage("tesind").build()
  ]
}

fn get_command_option() -> RunOptions {
  RunOptions {
    program_name: "things",
    version: "0.1.0",
    description: "This is the cli for interacting with the things suite of tools"
  }
}

pub fn handle_commands(args: Vec<String>) {
  run(get_commands(), args, get_command_option());
}