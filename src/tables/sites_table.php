<?php

require_once __DIR__ . '/../db/db_table_exist.php';
require_once __DIR__ . '/../db/db_create.php';

// returns true if table was created
function create_sites_table(mysqli $db, string $database): bool
{
    return db_create($db, $database, 'sites', [
        'key',
        'title',
        'owner',
        'email',
        'logo',
        'theme'], [
        'VARCHAR(32) NOT NULL UNIQUE',
        'VARCHAR(128) NOT NULL',
        'VARCHAR(128) NOT NULL',
        'VARCHAR(128) NOT NULL',
        'VARCHAR(128) NOT NULL',
        'VARCHAR(128) NOT NULL',
    ]);
}
