<?php

require_once __DIR__ . '/../db/db.php';

// returns true if table was created
function create_themes_table(mysqli $db, string $database): bool
{
    return db_create($db, $database, 'themes', [
        'name',
        'wLeft',
        'wCenter',
        'wRight',
        'vGap',
        'hGap',
        'hApp',
    ], [
        'VARCHAR(64) NOT NULL UNIQUE', // name
        'VARCHAR(16) NOT NULL', // wLeft (%)
        'VARCHAR(16) NOT NULL', // wCenter (%)
        'VARCHAR(16) NOT NULL', // wRight (%)
        'VARCHAR(16) NOT NULL', // vGap (px)
        'VARCHAR(16) NOT NULL', // hGap (px)
        'VARCHAR(16) NOT NULL', // hApp (vh)
    ]);
}
