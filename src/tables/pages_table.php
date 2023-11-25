<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../config.php';

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
        'contentW',
        'contentD',
        'contBg',
        'contFg',
        'contBorder',
        'contShadow',
        'markBg',
        'markFg',
        'markBorder',
        'markShadow',
        'markFsize',
        'markBold',
        'markItalic',
    ], [
        'VARCHAR(60) NOT NULL UNIQUE', // title
        'INT(11) NOT NULL', // pageId
        'VARCHAR(120) NOT NULL', // author
        'TINYINT NOT NULL', // showTitle
        'TINYINT NOT NULL', // pos
        'TINYINT NOT NULL', // isParent
        'TINYINT NOT NULL', // isPublic
        'VARCHAR(16) NOT NULL DEFAULT \'40vw\'', //contentW
        'VARCHAR(16) NOT NULL DEFAULT \'2vh\'', //contentD
        'VARCHAR(16) NOT NULL DEFAULT \'#303030\'',//contBg
        'VARCHAR(16) NOT NULL DEFAULT \'#ffffff\'',//contFg
        'VARCHAR(32) NOT NULL DEFAULT \'1px solid #ffffff\'',//contBorder
        'VARCHAR(8) NOT NULL DEFAULT \'1\'',//contShadow
        'VARCHAR(16) NOT NULL DEFAULT \'#303030\'',//markBg
        'VARCHAR(16) NOT NULL DEFAULT \'#ffa500\'',//markFg
        'VARCHAR(32) NOT NULL DEFAULT \'1px solid #ffa500\'',//markBorder
        'VARCHAR(8) NOT NULL DEFAULT \'1\'',//markShadow
        'VARCHAR(16) NOT NULL DEFAULT \'medium\'',//markFsize
        'VARCHAR(16) NOT NULL DEFAULT \'bold\'',//markBold
        'VARCHAR(16) NOT NULL DEFAULT \'normal\''//markItalic

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


function get_default_page(mysqli $db, $title, $author) {
 
    $sites = db_select($db, 'sites', ['theme'], db_where($db,'id',1) );
    if( $sites === false || gettype($sites) === 'string' ) die('Kunde inte ladda sidors startvärden');

    $themes = db_select($db, 'themes', ['*'], db_where($db, 'name', $sites[0]['theme']));
    if( $themes === false || gettype($themes) === 'string' ) {
        $themes = db_select($db, 'themes', ['*'], db_where($db, 'name', DEFAULT_THEME));
        if( $themes === false || gettype($themes) === 'string' ) die('Kunde inte ladda något tema');
    }
    $theme = $themes[0];

    return [
        $title, //title
        0, //parentId
        $author, //author
        '1', //showTitle
        0, //pos
        '0', //isParent
        '1', //isPublic
        $theme['contentW'],
        $theme['contentD'],
        $theme['contBg'],
        $theme['contFg'],
        $theme['contBorder'],
        $theme['contShadow'],
        $theme['markBg'],
        $theme['markFg'],
        $theme['markBorder'],
        $theme['markShadow'],
        $theme['markFsize'],
        $theme['markBold'],
        $theme['markItalic']
    ];
    
}