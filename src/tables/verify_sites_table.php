<?php

require_once __DIR__ . '/../db/db_table_exist.php';
require_once __DIR__ . '/sites_table.php';

// returns true if table was created 
function verify_sites_table(mysqli $db, string $database): bool | string
{
    if (db_table_exist($db, $database, 'sites') === false) {
        return create_sites_table($db, $database);
    } 
    return false;
}
