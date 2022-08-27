use diesel::RunQueryDsl;
use crate::DBConnect;
use crate::models::Group;
use crate::schema::groups::dsl::groups;

#[tauri::command]
pub fn get_groups(db: tauri::State<DBConnect>) -> Result<Vec<Group>, String> {
    match groups.load::<Group>(&*db.0.lock().unwrap()) {
        Err(err) => {
            println!("{}", err);
            Err("read groups failed".into())
        }
        Ok(all_groups) => Ok(all_groups)
    }
}