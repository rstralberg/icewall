<?php

require_once __DIR__ . '/../db/db.php';

// returns true if table was created 
function verify_themes_table(mysqli $db, string $database): bool | string
{
    if (db_table_exist($db, $database, 'themes') === false) {
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
    return false;
}

function get_default_theme(string $name) : array {

    return [
        $name,
        '20%', '80%', '20%',
        '10px', '10px', '2vh'
    ];
}