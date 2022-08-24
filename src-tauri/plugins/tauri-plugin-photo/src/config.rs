use std::sync::{Mutex, Arc};

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Config {
    theme: String,
}

impl Config {
    pub fn default() -> Config {
        Config {
            theme: "default".to_string(),
        }
    }
}

#[tauri::command]
pub fn get_config(config: tauri::State<Arc<Mutex<Config>>>) -> Config {
    config.lock().unwrap().clone()
}

#[tauri::command]
pub fn set_config(set_config: Config, config: tauri::State<Arc<Mutex<Config>>>) {
    *config.lock().unwrap() = set_config;
}