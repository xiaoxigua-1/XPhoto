use diesel::table;

table! {
    groups(id) {
        id -> Integer,
        name -> Text,
        color -> Text,
    }
}