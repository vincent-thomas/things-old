pub fn is_flag(maybe_flag: &str) -> bool {
    maybe_flag.starts_with('-') || maybe_flag.starts_with("--")
}

pub fn remove_flags(arg: String) -> String {
  let mut commands: Vec<String> = vec![];

  for maybe_flag in arg.split(' ') {
    if !is_flag(maybe_flag) {
      commands.push(maybe_flag.to_string());
    }
  }
  commands.join(" ")
}

pub fn strip_non_flags(string: &Vec<String>) -> Vec<String> {
  let mut flags = vec![];
  for item in string {
    if is_flag(item.as_str()) {
      flags.push(item.to_owned());
    }
  }
  flags
}

pub fn format_flag_to_name(flag: &str) -> String {
  flag.replace("--", "")
}

pub fn flag_truthy(flag_value: &str) -> bool {
  flag_value == "true" || flag_value != "false"
}


#[cfg(test)]
mod flags_tests {

use super::*;

  #[test]
  fn flag_truthy_valid_input() {
    let result = flag_truthy(&"true".to_string());
    assert_eq!(result, true);
    let result = flag_truthy(&"test".to_string());
    assert_eq!(result, true)
  }
  #[test]
  fn flag_truthy_unvalid_input() {
    let result = flag_truthy(&"false".to_string());
    assert_eq!(result, false)
  }
  #[test]
  fn format_flag_good_input() {
    let result = format_flag_to_name(&"--test".to_string());
    assert_eq!(result, "test".to_string());
  }
  #[test]
  fn format_flag_bad_input() {
    let result = format_flag_to_name(&"--this-test".to_string());
    assert_eq!(result, "this-test".to_string());
  }
  #[test]
  fn strip_flags_good_input() {
    let result = strip_non_flags(&vec!["--test".to_string(), "test".to_string()]);
    assert_eq!(result, vec!["--test".to_string()]);
  }

  #[test]
  fn strip_flags_bad_input() {
    let result = strip_non_flags(&vec!["tes2fdst".to_string(), "test".to_string()]);
    assert_eq!(result.len(), 0);
  }
}