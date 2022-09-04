use crate::diesel::ExpressionMethods;
use crate::models::{Groups, NewGroup};
use crate::schema::groups::dsl::groups;
use crate::{schema, DBConnect};
use diesel::{QueryDsl, RunQueryDsl};

#[tauri::command]
pub fn get_groups(db: tauri::State<DBConnect>) -> Result<Vec<Groups>, String> {
    match groups.load::<Groups>(&*db.0.lock().unwrap()) {
        Ok(all_groups) => Ok(all_groups),
        Err(err) => {
            println!("{}", err);
            Err("read groups failed".into())
        }
    }
}

#[tauri::command]
pub fn add_group(db: tauri::State<DBConnect>, group: NewGroup) -> Option<String> {
    let execute_result = diesel::insert_into(schema::groups::table)
        .values(&group)
        .execute(&*db.0.lock().unwrap());
    match execute_result {
        Err(err) => Some(format!("{}", err)),
        _ => None,
    }
}

#[tauri::command]
pub fn edit_group(db: tauri::State<DBConnect>, group: NewGroup, id: i32) -> Option<String> {
    let execute_result = diesel::update(groups.find(id))
        .set((
            schema::groups::name.eq(&group.name),
            schema::groups::color.eq(&group.color),
        ))
        .execute(&*db.0.lock().unwrap());

    match execute_result {
        Err(err) => Some(format!("{}", err)),
        _ => None,
    }
}

#[tauri::command]
pub fn delete_group(db: tauri::State<DBConnect>, id: i32) -> Option<String> {
    let execute_result = diesel::delete(groups.find(id)).execute(&*db.0.lock().unwrap());

    match execute_result {
        Err(err) => Some(format!("{}", err)),
        _ => None,
    }
}
