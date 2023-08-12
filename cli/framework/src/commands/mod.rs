use crate::{
  utils::{
    contains_char, remove_flags
  },
  CommandSpacer::{self,*},
  CommandError,
  FormatOptions
};

pub mod register;
pub use register::run;

pub trait CommandSpacerTrait {
  fn value(&self) -> char;
}

impl CommandSpacerTrait for CommandSpacer {
    fn value(&self) -> char {
    match *self {
      Dots => ':'.to_owned(),
      Space => ' '.to_owned(),
      Dot => '.'.to_owned(),
      Custom(ref value) => value.to_owned()
    }
  }
}

pub fn validate_command_str(args: &str, spacer: &CommandSpacer) -> Result<(), CommandError> {
  let commands_vec = args.split_whitespace();
  let is_valid_format: bool = match spacer {
    Space => {
      let dot_valid = !contains_char(args, Dot.value());
      let dots_valid = !contains_char(args, Dots.value());
      dot_valid && dots_valid
    }
    Dots => {
      let dot_valid = !contains_char(args, Dot.value());
      let space_valid = !contains_char(args, Space.value());
      dot_valid && space_valid && commands_vec.count() == 1
    }
    Dot => {
      let dots_valid = !contains_char(args, Dots.value());
      let space_valid = !contains_char(args, Space.value());
      dots_valid && space_valid && commands_vec.count() == 1
    }
    Custom(_) => {
      let dots_valid = !contains_char(args, Dots.value());
      let space_valid = !contains_char(args, Space.value());
      let dot_valid = !contains_char(args, Dot.value());
      dots_valid && space_valid && dot_valid
    }
  };

  match is_valid_format {
    true => Ok(()), 
    false => Err(CommandError::InvalidInput)
  }
}

pub fn format_commands(args: &str, config: FormatOptions) -> Result<Vec<String>, CommandError> {
  let commands = remove_flags(args.to_string());
  let is_valid_format = validate_command_str(&commands, &config.spacer).is_ok();
  if !is_valid_format && config.validate_format {
    return Err(CommandError::WrongFormat);
  }

  let commands_to_vec = commands.split(config.spacer.value()).map(String::from).collect::<Vec<String>>();
  Ok(commands_to_vec)
}

#[cfg(test)]
mod validate_command_str_tests {

  use super::*;

  #[test]
  fn validate_valid_string_spaces() {
    let result = validate_command_str("test test:test", &Space);
    assert!(!result.is_ok());
  }

  #[test]
  fn validate_unvalid_string_spaces() {
    let result = validate_command_str("test test", &Space);
    assert!(result.is_ok());
  }

  #[test]
  fn validate_valid_string_dot() {
    let result = validate_command_str("test.test", &Dot);
    assert!(result.is_ok());
  }

  #[test]
  fn validate_unvalid_string_dot() {
    let result = validate_command_str("test.test:test", &Dot);
    assert!(!result.is_ok());
  }
  #[test]
  fn validate_valid_string_dots() {
    let result = validate_command_str("test:test", &Dots);
    assert!(result.is_ok());
  }
  #[test]
  fn validate_unvalid_string_dots() {
    let result = validate_command_str("test:test test", &Dots);
    assert!(!result.is_ok());
  }
}

#[cfg(test)]
mod format_commands_test {
  use super::*;
  use crate::prelude::f;

  #[test]
  fn output_is_valid() {
    let separator = '&';
    let result = format_commands(f!("test{}test", separator.to_string()).as_str(), FormatOptions { spacer: Custom('&'), validate_format: true });
    assert!(result.is_ok());
    assert_eq!(result.unwrap().len(), 2);
  }
}


