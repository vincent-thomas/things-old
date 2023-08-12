use crate::utils::{flags::strip_non_flags, is_flag, format_flag_to_name};

pub fn format_to_flag_key(flag: String) -> (String, Option<String>) {
  let sharable = flag.contains('=');

  if sharable {
    let mut flag_split = flag.split('=').map(String::from);
    let flag_key = flag_split.next().unwrap();
    let flag_value = flag_split.next();
    return (flag_key.to_string(), flag_value);
  }
  let maybe_no = flag.contains("no-");
  if maybe_no {
    let flag_to_return = flag.replace("no-", "");
    return (flag_to_return, Some("false".to_string()));
  }
  (flag, Some("true".to_string()))
}

pub fn format_flag(flags: Vec<String>) -> Vec<(String, Option<String>)> {
  flags
      .iter()
      .filter(|flag| is_flag(flag))
      .map(|flag| format_flag_to_name(flag))
      .map(|flag| format_to_flag_key(flag.to_owned()))
      .collect::<Vec<(String, Option<String>)>>()
}
pub fn use_flag(name: &str, args: &Vec<String>) -> Option<String> {
  let stripped_flags = strip_non_flags(args);
  let flags = format_flag(stripped_flags);
  let mut flag_keys = vec![];

  for item in flags.clone() {
    flag_keys.push(item.0);
  };
  let is_there = flag_keys.contains(&name.to_string());

  if !is_there {
    return None;
  }

  let mut index_name: Option<usize> = None;

  for (index, item) in flag_keys.iter().enumerate() {
    if item == name {
      index_name = Some(index);
    }
  }

  let selected_flag = flags.get(index_name.unwrap()).unwrap().to_owned();

  selected_flag.1
}