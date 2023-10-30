<?php

require_once __DIR__ . '/dbTable.php';
require_once __DIR__ . '/../config.php';


class dbContents extends dbTable{

    public function __construct() { parent::__construct('contents');}
    
    public function create(db $db) : bool|string {

        if( $db->createTable($this->tableName, [
            'pageId',
            'pos',
            'html',
            'isPublic'
        ], [
            'INT(11) NOT NULL',// pageId
            'TINYINT NOT NULL',// pos
            'TEXT NOT NULL',//html
            'TINYINT NOT NULL'// isPublic
        ]) ) return true;
        else return $db->lastError();
    }
}


?>