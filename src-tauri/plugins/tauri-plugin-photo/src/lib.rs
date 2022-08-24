extern crate directories;

mod config;

use config::Config;
use diesel::{sqlite, Connection, SqliteConnection};
use directories::ProjectDirs;
use std::{fs, sync::{Mutex, Arc}};
use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

struct DBConnect(Mutex<SqliteConnection>);

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    let project_dir = ProjectDirs::from("com", "xiaoxigua-1", "XPhoto").unwrap();
    let config_dir = project_dir.config_dir();
    let data_dir = project_dir.data_dir();
    fs::create_dir_all(config_dir).unwrap();
    fs::create_dir_all(data_dir).unwrap();
    let config_path = config_dir.join("config.toml");
    let config = if let Ok(config_str) = fs::read_to_string(&config_path) {
        toml::from_str(config_str.as_str()).expect("config.toml parse failed")
    } else {
        let config = Config::default();
        fs::write(config_path, toml::to_string(&config).unwrap()).unwrap();
        config
    };

    let db = sqlite::SqliteConnection::establish(data_dir.join("data.sqlite").to_str().unwrap())
        .expect("");
    Builder::new("photo")
        .setup(|app| {
            app.manage(DBConnect(Mutex::new(db)));
            app.manage(Arc::new(Mutex::new(config)));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![config::get_config, config::set_config])
        .build()
}
