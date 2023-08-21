pub fn use_flag(name: &'static str, args: &[(String, String)]) -> Option<String> {
  let mut flag_keys = vec![];

  for item in args.clone() {
    flag_keys.push(item.0.clone());
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

  let selected_flag = args.get(index_name.unwrap()).unwrap().to_owned();

  Some(selected_flag.1)
}