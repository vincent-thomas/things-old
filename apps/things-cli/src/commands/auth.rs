use std::process;
use clier::command::{Command, CliCommand};
use clier::hooks::use_flag;
use inquire::Text;

fn _get_values(message: &str) -> String {

  let name = Text::new(message).prompt();
  if name.is_err() {
    println!("Error: {:?}", name.expect_err("Unknown error"));

    std::process::exit(1);
  }
  name.unwrap()
}

fn command(_: Vec<String>, args: Vec<(String, String)>) {

  let auth_token = use_flag("token", &args).unwrap_or("1234".to_string());

  if auth_token == "1234" || auth_token == "true" {
    println!("You are not authenticated");
    process::exit(1);
  }
  println!("{auth_token}");
}

pub fn auth_command() -> Command {
  CliCommand::new("auth", command).description("For auth related stuff").build()
}