use std::vec;

use clier::Command;
use inquire::Text;

pub fn login_command(args: clier::Args) -> i32 {
    println!("Login at: http://localhost:8080/auth/google/authorize?src=terminal");
    let name = Text::new("Enter token here:").prompt();

    println!("{}", name.unwrap());
    0
}
pub fn token_command(_args: clier::Args) -> i32 {
    let name = Text::new("Enter token here:").prompt();

    println!("{}", name.unwrap());
    0
}

pub fn auth_command() -> Command {
    Command::new("auth", "Authenticate with Things", None, |_| 0)
        .push_cmd("login", "Login to things", None, login_command)
        .push_cmd("token", "Authenticate with token", None, token_command)
}
