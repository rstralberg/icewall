<?php

require_once __DIR__ . '/dbTable.php';
require_once __DIR__ . '/../config.php';


class dbSections extends dbTable{

    public function __construct() { parent::__construct('sections');}
    
    public function create(db $db) : bool|string {

        if( $db->createTable($this->tableName, [
            'pageId',
            'pos',
            'html',
            'isPublic'
        ], [
            'INT(11) NOT NULL DEFAULT 0',// pageId
            'TINYINT NOT NULL DEFAULT 0',// pos
            'TEXT NOT NULL DEFAULT \'IceWall\'',//html
            'TINYINT NOT NULL DEFAULT 0'// isPublic
        ]) ) return true;
        else return $db->lastError();
    }
}


?>