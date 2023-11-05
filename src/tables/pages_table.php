<?php

require_once __DIR__ . '/../db/db.php';

function create_pages_table(mysqli $db, string $database): bool
{
    return db_create($db, $database, 'pages', [
        'title',
        'parentId',
        'author',
        'showTitle',
        'pos',
        'isParent',
        'isPublic',
    ], [
        'VARCHAR(60) NOT NULL UNIQUE', // title
        'INT(11) NOT NULL', // pageId
        'VARCHAR(120) NOT NULL', // author
        'TINYINT NOT NULL', // showTitle
        'TINYINT NOT NULL', // pos
        'TINYINT NOT NULL', // isParent
        'TINYINT NOT NULL', // isPublic
    ]);
}
