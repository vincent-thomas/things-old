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

#[derive(Debug)]
enum ArgsList {
    Command(Command),
    Flag(Flag),
}

// impl ArgsList {
//     fn Command(name: String, short: Option<String>, children: Option<Vec<Command>>) -> Command {
//         Command {
//             name: name,
//             children: children,
//             short: short,
//         }
//     }
//     fn Flag(name: String, short: Option<String>, value: Option<String>) -> Flag {
//         Flag {
//             name: name,
//             short: short,
//             value,
//         }
//     }
// }

fn is_flag(maybe_flag: &String) -> bool {
    maybe_flag.starts_with("-") || maybe_flag.starts_with("--")
}

fn get_registered_command(registered: &Vec<Command>, testad: &Vec<String>) {
    let mut base_command: Option<String> = None;
    for (_, value) in testad.iter().enumerate() {
        for command_r in registered.iter() {
            if value.len() == 1 && command_r.short.is_some() {
                let is = command_r.short.as_ref().unwrap() == value;
                if is {
                    base_command = Some(command_r.name.clone());
                }
            } else {
                let is = &command_r.name == value;
                if is {
                    base_command = Some(command_r.name.clone());
                }
            }
        }
    }
    if base_command.is_some() {
        println!("{}", base_command.unwrap());
    } else {
        println!("nooo")
    }
}

fn main() {
    let mut config: Vec<ArgsList> = vec![];

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
        children: None,
        name: String::from("testing"),
        short: Some(String::from("t")),
    };
    let till = Command {
        children: None,
        name: String::from("test"),
        short: Some(String::from("f")),
    };
    let if_is = get_registered_command(&vec![testing_command, till], &commands);
    println!("{:?}", if_is)
    // config.push(command);

    // match &config. {
    //     None => println!("testing"),
    //     ArgsList::Command::Some() => println!("Some"), // ArgsList::Command => println!("testing"),
    // }
    // println!("{:?}", &config.get(1));
    // println!("{:?}", &commands);

    // std::process::

    // let args = Cli::parse();
    // let file = std::fs::read_to_string(&args.path);
    // let result = match file {
    //     Ok(file_str) => file_str,
    //     Err(_) => String::from("error"),
    // };
    // println!("{} {}", &result, &args.pattern);
}
