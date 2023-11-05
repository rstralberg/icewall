<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/users_table.php';

// returns true if table was created 
function verify_users_table(mysqli $db, string $database): bool | string
{
    if (db_table_exist($db, $database, 'users') === false) {
        return create_users_table($db, $database);
    }
    return false;
}

function get_default_user(string $fullname, string $email) : array {
    return [ 'admin', $fullname, $email, '/icons/avatar.png', password_hash('winterfall', PASSWORD_DEFAULT) ];
}