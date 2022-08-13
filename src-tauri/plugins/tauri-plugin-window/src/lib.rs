use tauri::{Manager, plugin::{Builder, TauriPlugin}, Runtime};

#[tauri::command]
fn close_splashscreen<R: Runtime>(window: tauri::Window<R>) {
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }

  window.get_window("main").unwrap().show().unwrap();
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("window")
      .invoke_handler(tauri::generate_handler![close_splashscreen])
      .build()
}
