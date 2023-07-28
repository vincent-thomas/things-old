use std::env;

/// Search for a pattern in a file and display the lines that contain it.
// struct Cli {
//     /// The pattern to look for
//     pattern: String,
//     /// The path to the file to read
//     path: std::path::PathBuf,
// }
#[derive(Debug)]
struct Flag {
    name: String,
    short: Option<String>,
    value: Option<String>,
}
#[derive(Debug, Clone)]
struct Command {
    name: String,
    short: Option<String>,
    children: Option<Vec<Command>>,
}

fn is_flag(maybe_flag: &str) -> bool {
    maybe_flag.starts_with('-') || maybe_flag.starts_with("--")
}

fn is_short(command: &str) -> bool {
    command.len() == 1
}

fn get_command(registered_commands: &[Command], test_args: &[String]) -> Option<Command> {
    let mut root_command: Option<String> = None;
    let mut root_command_index: Option<usize> = None;
    for (_, value) in test_args.iter().enumerate() {
        for (index, command_r) in registered_commands.iter().enumerate() {
            let command_name = command_r.name.clone();
            if is_short(value)
                && command_r.short.is_some()
                && command_r.short.as_ref().unwrap() == value
            {
                root_command = Some(command_name);
                root_command_index = Some(index);
            } else {
                if &command_r.name == value {
                    root_command = Some(command_name);
                    root_command_index = Some(index);
                }
            }
        }
    }
    root_command?;

    let index =
        root_command_index.expect("Weird error when extracting index of found registered command");

    let root_command = &registered_commands[index];

    let command_to_send = root_command.clone();

    Some(command_to_send)
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let mut commands: Vec<String> = vec![];
    let mut flags: Vec<String> = vec![];

    for i in args
        .iter()
        .enumerate()
        .filter(|(index, _)| -> bool { index != &0 })
    {
        let (_, value) = i;
        if is_flag(value) {
            let flag = value.replace('-', "");
            flags.push(flag);
        } else {
            commands.push(value.clone())
        }
    }

    let testing_command = Command {
        children: Some(vec![Command {
            name: String::from("test"),
            short: Some(String::from("f")),
            children: None,
        }]),
        name: String::from("testing"),
        short: Some(String::from("t")),
    };

    let reigstered = vec![testing_command];

    let if_is = get_command(&reigstered, &commands);
    let mut command_string: String = String::from("");

    if if_is.is_none() {
        println!("none :(");
        return;
    }

    let the_command = if_is.unwrap();
    command_string.push_str(the_command.name.as_str());
    if let Some(children) = the_command.children {
        let _ = &commands.remove(0);
        match get_command(&children, &commands) {
            Some(sub_command) => {
                command_string.push('.');
                command_string.push_str(sub_command.name.as_str());
            }
            None => {
                println!("{:?}", "nooo")
            }
        }
    }

    println!("{command_string}")
}
