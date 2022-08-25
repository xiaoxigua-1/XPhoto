use diesel::table;

table! {
    groups_data {
        id -> Integer,
        name -> Text,
        color -> Text,
    }
}