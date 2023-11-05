<?php

require_once __DIR__ . '/../db/db.php';

function create_contents_table(mysqli $db, string $database): bool
{
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
    ]);
}
