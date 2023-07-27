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
#[derive(Debug)]
struct Command {
    name: String,
    short: Option<String>,
    children: Option<Vec<Command>>,
}

fn is_flag(maybe_flag: &String) -> bool {
    maybe_flag.starts_with("-") || maybe_flag.starts_with("--")
}

fn get_registered_command<'a>(
    registered: &'a Vec<Command>,
    testad: &Vec<String>,
) -> Option<&'a Command> {
    let mut base_command: Option<String> = None;
    let mut base_command_index: Option<usize> = None;
    for (_, value) in testad.iter().enumerate() {
        for (index, command_r) in registered.iter().enumerate() {
            if value.len() == 1 && command_r.short.is_some() {
                let is = command_r.short.as_ref().unwrap() == value;
                if is {
                    base_command = Some(command_r.name.clone());
                    base_command_index = Some(index);
                }
            } else {
                let is = &command_r.name == value;
                if is {
                    base_command = Some(command_r.name.clone());
                    base_command_index = Some(index);
                }
            }
        }
    }
    if base_command.is_none() {
        return None;
    }

    let index = base_command_index.unwrap();

    let root_command = &registered[index];
    println!("{:?}", root_command);

    if root_command.children.is_none() {
        return None;
    }

    let children = root_command.children.as_ref().unwrap();

    if children.len() == 0 {
        return Some(root_command);
    }

    println!("wooo {:?}", children);
    return Some(root_command);
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
            let flag = value.replace("-", "");
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
    let if_is = get_registered_command(&reigstered, &commands);
    println!("{:?}", if_is.unwrap())
}
