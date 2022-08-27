extern crate directories;
#[macro_use] extern crate diesel;
#[macro_use] extern crate diesel_migrations;

mod config;
mod models;
mod schema;
mod group;

use config::Config;
use diesel::{sqlite, Connection, SqliteConnection};
use directories::ProjectDirs;
use std::{
    fs,
    path::PathBuf,
    sync::{Arc, Mutex},
};
use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

pub struct DBConnect(Arc<Mutex<SqliteConnection>>);

pub struct ConfigState {
    config: Arc<Mutex<Config>>,
    config_path: PathBuf,
}

embed_migrations!("./migrations");
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
        config.write_config(&config_path);
        config
    };
    
    let db = sqlite::SqliteConnection::establish(data_dir.join("data.sqlite").to_str().unwrap())
        .expect("");
    // database initialization
    embedded_migrations::run(&db).unwrap();
    embedded_migrations::run_with_output(&db, &mut std::io::stdout()).unwrap();
    
    Builder::new("photo")
        .setup(|app| {
            app.manage(DBConnect(Arc::new(Mutex::new(db))));
            app.manage(ConfigState {
                config: Arc::new(Mutex::new(config)),
                config_path,
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            config::get_config,
            config::set_config,
            group::get_groups,
        ])
        .build()
}
