use crate::DBConnect;

#[tauri::command]
pub fn get_groupds(db: tauri::State<DBConnect>) {
    db.0.clone().lock().unwrap();
}