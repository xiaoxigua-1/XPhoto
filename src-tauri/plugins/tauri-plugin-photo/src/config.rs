use std::{fs, path::PathBuf};

use serde::{Deserialize, Serialize};

use crate::ConfigState;

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Config {
    theme: String,
}

impl Config {
    pub fn default() -> Config {
        Config {
            theme: "default".into(),
        }
    }

    pub fn write_config(&self, path: &PathBuf) {
        let config_toml_str = toml::to_string(&self).unwrap();
        fs::write(path, config_toml_str).unwrap();
    }
}

#[tauri::command]
pub fn get_config(config: tauri::State<ConfigState>) -> Config {
    config.config.lock().unwrap().clone()
}

#[tauri::command]
pub fn set_config(set_config: Config, config: tauri::State<ConfigState>) {
    set_config.write_config(&config.config_path);
    *config.config.lock().unwrap() = set_config;
}
