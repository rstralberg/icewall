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


// returns true if table was created 
function verify_pages_table(mysqli $db, string $database): bool | string
{
    if (db_table_exist($db, $database, 'pages') === false) {
        return create_pages_table($db, $database);
    } 
    return false;
}

function get_first_page_id(mysqli $db): int
{
    $pages = db_select($db, 'pages', ['id'],
        db_name('isParent') . '=0 AND ' .
        db_name('isPublic') . '=1 AND ' .
        db_name('parentId') . '=0',
        db_name('pos') . ' asc',
        'LIMIT 1'
    );
    if (!$pages) {
        $pages = db_select($db, 'pages', ['id'],
            db_name('isParent') . '=0 AND ' .
            db_name('parentId') . '=0',
            db_name('pos') . ' asc',
            'LIMIT 1'
        );
    }
    return $pages ? $pages[0]['id'] : -1;
}
