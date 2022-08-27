use diesel::{Queryable};
use serde::Serialize;


#[derive(Queryable, Serialize, Clone)]
pub struct Group {
    id: i32,
    name: String,
    color: String,
}
