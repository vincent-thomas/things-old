mod commands;

use clier::{Cli, CliBuilder, Runnable};
use commands::{auth_command, ping_command};
use std::env;

const VERSION: &'static str = env!("CARGO_PKG_VERSION");
const DESCRIPTION: &'static str = env!("CARGO_PKG_DESCRIPTION");
const NAME: &'static str = env!("CARGO_PKG_NAME");

pub fn get_cli() -> Cli {
    let args: Vec<String> = env::args().collect();
    CliBuilder::new()
        .meta(NAME, DESCRIPTION, VERSION, "<subcommand> [--flag=value]")
        .command(ping_command())
        .command(auth_command())
        .build(args)
}

fn main() {
    let cli = get_cli();
    cli.run();
}
