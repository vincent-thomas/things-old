use std::{collections::HashMap, process};
use clier::command::{Command, CliCommand};
use inquire::Text;
use reqwest;
use serde::Serialize;
use serde_json::Value;

fn _get_values(message: &str) -> String {

  let name = Text::new(message).prompt();
  if name.is_err() {
    println!("Error: {:?}", name.expect_err("Unknown error"));

    std::process::exit(1);
  }
  name.unwrap()
}
#[derive(Debug, Serialize, PartialEq)]
enum ResponseField {
  Text(String),
  Number(i32)
}

use ResponseField::*;

impl<'a> serde::de::Deserialize<'a> for ResponseField {
  fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
  where
    for<'b> D: serde::de::Deserializer<'a>,
  {
    let value = Value::deserialize(deserializer)?;
    match value {
      Value::String(s) => Ok(ResponseField::Text(s)),
      Value::Number(n) => Ok(ResponseField::Number(n.as_i64().unwrap() as i32)),
      _ => Err(serde::de::Error::custom("expected a string or number")),
    }
  }
}

fn command(_commands: Vec<String>, _args: Vec<(String,String)>) {
  let response = reqwest::blocking::get("http://localhost:8080/healthcheck").unwrap_or_else(
        |e| {
          println!("Error: {:?}", e);
          process::exit(1);
        }
      )
      .json::<HashMap<String, ResponseField>>().unwrap_or_else(
        |e| {
          println!("Error: {:?}", e);
          process::exit(1);
        }
      );
  if *response.get("status").unwrap() == Text("up".to_string()) {
    println!("Things is up!");
  }
}

pub fn ping_command() -> Command {
  CliCommand::new("ping", command)
    .description("To check if api is up")
    .usage("tesind")
    .help_string("flags: --token, --name")
    .build()
}