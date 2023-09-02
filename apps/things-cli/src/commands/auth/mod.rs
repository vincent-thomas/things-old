use crate::get_cli;
use clier::{use_help, Args, Command};
use inquire::Text;

pub fn command(options: Args) {
    if options.commands.get(1).is_none() {
        use_help(get_cli().commands, get_cli().options)
    }
    let command = options.commands.get(1).unwrap();

    if command == "login" {
        println!("Login at: http://localhost:8080/auth/google/authorize?src=terminal");
        let name = Text::new("Enter token here:").prompt();

        println!("{}", name.unwrap());
    } else if command == "token" {
        let _name = Text::new("Enter token here:").prompt();

        // let res =
        // reqwest::blocking::get("http://localhost:8080/auth/user").
        // ("", ;
    }
}

pub fn auth_command() -> Command {
    Command {
        name: "auth",
        description: "Authenticate with Things Cloud",
        usage: Some("auth <subcommand>"),
        help_string: None,
        handler: command,
    }
}
