use tauri::{plugin::{Builder, TauriPlugin}, Runtime};
use diesel::{Connection, sqlite};

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  sqlite::SqliteConnection::establish("").expect("");
  Builder::new("photo")
      .build()
}
