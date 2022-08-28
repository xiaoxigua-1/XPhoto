use super::schema::groups;
use diesel::Queryable;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Clone)]
pub struct Groups {
    id: i32,
    name: String,
    color: String,
}

#[derive(Insertable, Deserialize, Clone)]
#[table_name = "groups"]
pub struct NewGroup {
    name: String,
    color: String,
}
