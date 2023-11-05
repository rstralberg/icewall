<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/themes_table.php';

// returns true if table was created 
function verify_themes_table(mysqli $db, string $database): bool | string
{
    if (db_table_exist($db, $database, 'themes') === false) {
        return create_themes_table($db, $database) ;
    }
    return false;
}

function get_default_theme(string $name) : array {

    return [
        $name,
        '20%', '80%', '20%',
        '2vh', '3vh', '2vh'
    ];
}