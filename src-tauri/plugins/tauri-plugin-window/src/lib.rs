use tauri::{plugin::{Builder, TauriPlugin}, Runtime};

#[tauri::command]
fn close_window(window: tauri::Window) {
  window.close().expect("Closing window failed");
}

// #[tauri::command]
// fn close_splashscreen(window: tauri::Window<Wry>) {
//   if let Some(splashscreen) = window.get_window("splashscreen") {
//     splashscreen.close().unwrap();
//   }
// }

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("window")
      .build()
}
