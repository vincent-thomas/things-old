use clap::Parser;

/// Search for a pattern in a file and display the lines that contain it.
#[derive(Parser)]
struct Cli {
    /// The pattern to look for
    pattern: String,
    /// The path to the file to read
    path: std::path::PathBuf,
}

fn main() {
    let args = Cli::parse();
    let file = std::fs::read_to_string(&"./test");
    let result = match file {
        Ok(file_str) => file_str,
        Err(_) => String::from("error"),
    };
    println!("{} {}", &result, &args.pattern);
}
