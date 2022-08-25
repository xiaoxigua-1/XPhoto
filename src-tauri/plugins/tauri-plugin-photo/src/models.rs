use diesel::{Queryable};


#[derive(Queryable)]
pub struct Group {
    id: i32,
    name: String,
    color: String,
}
