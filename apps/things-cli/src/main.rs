mod commands;

use clier::{CliMeta, Clier, Runnable};
use commands::{auth_command, ping_command};
use std::env;

const VERSION: &'static str = env!("CARGO_PKG_VERSION");
const DESCRIPTION: &'static str = env!("CARGO_PKG_DESCRIPTION");
const NAME: &'static str = env!("CARGO_PKG_NAME");

pub fn get_cli() -> Clier {
    let args: Vec<String> = env::args().collect();

    let meta = CliMeta {
        name: NAME.to_string(),
        description: DESCRIPTION.to_string(),
        version: VERSION.to_string(),
        usage: Some("<subcommand> [--flag=value]".to_string()),
    };

    Clier::parse(args)
        .meta(meta)
        .add_command(ping_command())
        .add_command(auth_command())
}

fn main() {
    let cli = get_cli();
    match cli.run() {
        Ok(code) => std::process::exit(code),
        Err(e) => {
            println!("Error: {}", e);
            std::process::exit(1);
        }
    }
}
