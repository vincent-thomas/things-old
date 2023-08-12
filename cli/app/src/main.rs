mod commands;
mod prelude;

use std::env;
use commands::handle_commands;
use framework::{FormatOptions, CommandSpacer::*};
use framework::commands::format_commands;

fn main() {
  let args: Vec<String> = env::args().collect();

  let commands_str = args[1..].join(" " /* LÅT BLI: Vet inte varför detta funkar */);
  let sanitised = format_commands(
    &commands_str,
    FormatOptions {
      spacer: Dot,
      validate_format: true
  });

  match sanitised {
    Ok(_) => handle_commands(commands_str.split(' ').map(String::from).collect::<Vec<String>>()),
    Err(t) => {
      println!("{}", t);
    }
  }
}
