<?php

require_once __DIR__ . '/../db/db.php';

// returns true if table was created 
function verify_contents_table(mysqli $db, string $database): bool 
{
    if (db_table_exist($db, $database, 'contents') === false) {
        return db_create($db, $database, 'contents', [
            'pageId',
            'pos',
            'html',
            'isPublic',
        ], [
            'INT(11) NOT NULL', // pageId
            'TINYINT NOT NULL', // pos
            'TEXT NOT NULL', //html
            'TINYINT NOT NULL', // isPublic
        ]) ;
    } 
    return false ;
}
