<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/contents_table.php';

// returns true if table was created 
function verify_contents_table(mysqli $db, string $database): bool 
{
    if (db_table_exist($db, $database, 'contents') === false) {
        return create_contents_table($db, $database);
    } 
    return false ;
}
