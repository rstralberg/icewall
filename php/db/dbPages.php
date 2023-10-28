<?php

require_once __DIR__ . '/dbTable.php';
require_once __DIR__ . '/../config.php';

class dbPages extends dbTable {

    public function __construct() { parent::__construct('pages');}

    public function create(db $db) : bool|string {
        if ( $db->createTable($this->tableName, [
            'title',
            'parentId',
            'author',
            'showTitle',
            'pos',
            'isParent',
            'isPublic'
        ], [
            'VARCHAR(60) NOT NULL DEFAULT \'Start\' UNIQUE',// title
            'INT(11) NOT NULL DEFAULT 0',// pageId
            'VARCHAR(120) NOT NULL DEFAULT \'' . DEFAULT_USERNAME . '\'',// author
            'TINYINT NOT NULL DEFAULT 1',// showTitle
            'TINYINT NOT NULL DEFAULT 0',// pos
            'TINYINT NOT NULL DEFAULT 0',// isParent
            'TINYINT NOT NULL DEFAULT 1'// isPublic
        ]) ) return true;
        else return $db->lastError();
    }
}

function getFirstPageId(Db $db)
{
    $pages = $db->select('pages', ['id'],
        $db->name('isParent') . '=0 AND ' .
        $db->name('isPublic') . '=1 AND ' .
        $db->name('parentId') . '=0',
        $db->name('pos') . ' asc',
        'LIMIT 1'
    );
    if( !$pages) {
        $pages = $db->select( 'page', ['id'],
            $db->name('isParent') . '=0 AND ' .
            $db->name('parentId') . '=0',
            $db->name('pos') . ' asc',
            'LIMIT 1'
        );
    }
    return $pages ? $pages[0]['id'] : -1;
}


?>