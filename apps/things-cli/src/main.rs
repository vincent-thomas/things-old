mod commands;

use clier::{CliBuilder, Runnable};
use commands::{ping_command};
use std::env;

const VERSION: &'static str = env!("CARGO_PKG_VERSION");
const DESCRIPTION: &'static str = env!("CARGO_PKG_DESCRIPTION");
const NAME: &'static str = env!("CARGO_PKG_NAME");

fn main() {
  let args: Vec<String> = env::args().collect();

  CliBuilder::new()
  .meta(NAME, DESCRIPTION, VERSION, "<subcommand> [--flag=value]")
  .command(ping_command())
  .build(args)
  .run();
}
