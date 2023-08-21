mod commands;

use commands::{auth_command, ping_command};
use clier::conf;
use clier::builder::{CliBuilder, CommandBuilder};

use std::env;

const VERSION: &'static str = env!("CARGO_PKG_VERSION");
const DESCRIPTION: &'static str = env!("CARGO_PKG_DESCRIPTION");
const NAME: &'static str = env!("CARGO_PKG_NAME");

fn main() {
  let _args: Vec<String> = env::args().collect();

  let options = conf::ProgramOptions {
    name: NAME,
    version: VERSION,
    description: DESCRIPTION,
    usage: Some("<command>[:subcommand] [flags]")
  };
  let app = CliBuilder::new(_args)
    .program_options(options)
    .command(auth_command())
    .command(ping_command())
    .build();

  app.spacing(conf::Spacing::Dots).run();
}
