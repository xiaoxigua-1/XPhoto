use crate::models::{Groups, NewGroup};
use crate::schema::groups::dsl::groups;
use crate::{schema, DBConnect};
use diesel::RunQueryDsl;

#[tauri::command]
pub fn get_groups(db: tauri::State<DBConnect>) -> Result<Vec<Groups>, String> {
    match groups.load::<Groups>(&*db.0.lock().unwrap()) {
        Ok(all_groups) => Ok(all_groups),
        _ => Err("read groups failed".into()),
    }
}

#[tauri::command]
pub fn add_group(db: tauri::State<DBConnect>, group: NewGroup) -> Result<bool, String> {
    diesel::insert_into(schema::groups::table)
        .values(&group)
        .execute(&*db.0.lock().unwrap())
        .unwrap();
    Ok(true)
}