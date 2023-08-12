pub mod flags;

pub use flags::*;

pub fn contains_char(string: &str, matching: char) -> bool {
  string.contains(matching)
}
