<?php

require_once __DIR__ . '/../db/db.php';

function create_contents_table(mysqli $db, string $database): bool
{
    return db_create($db, $database, 'contents', [
        'pageId',
        'pos',
        'html',
        'style',
        'isPublic',
    ], [
        'INT(11) NOT NULL', // pageId
        'TINYINT NOT NULL', // pos
        'TEXT NOT NULL', //html
        'VARCHAR(256) NOT NULL', //style
        'TINYINT NOT NULL', // isPublic
    ]);
}

// returns true if table was created 
function verify_contents_table(mysqli $db, string $database): bool 
{
    if (db_table_exist($db, $database, 'contents') === false) {
        return create_contents_table($db, $database);
    } 
    return false ;
}
