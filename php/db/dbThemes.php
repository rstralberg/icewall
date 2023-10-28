<?php

require_once __DIR__ . '/dbTable.php';

class dbThemes extends dbTable{

    public function __construct() { parent::__construct('themes');}
    
    public function create(db $db) : bool|string {

        if( $db->createTable($this->tableName, [
            'name',
            'wCenter',
            'vGap',
            'hGap',
            'hApp'
        ], [
            'VARCHAR(64) NOT NULL DEFAULT \'IceWall\' UNIQUE',// name
            'TINYINT NOT NULL DEFAULT 80',// wCenter (%)
            'TINYINT NOT NULL DEFAULT 20',// vGap (px)
            'TINYINT NOT NULL DEFAULT 30',// hGap (px)
            'TINYINT NOT NULL DEFAULT 98'// hApp (vh)
        ]) ) return true;
        else return $db->lastError();
    }
}

?>