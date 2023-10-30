<?php

require_once __DIR__ . '/dbTable.php';

class dbThemes extends dbTable{

    public function __construct() { parent::__construct('themes');}
    
    public function create(db $db) : bool|string {

        if( $db->createTable($this->tableName, [
            'name',
            'wLeft',
            'wCenter',
            'wRight',
            'vGap',
            'hGap',
            'hApp'
        ], [
            'VARCHAR(64) NOT NULL UNIQUE',// name
            'TINYINT NOT NULL',// wLeft (%)
            'TINYINT NOT NULL',// wCenter (%)
            'TINYINT NOT NULL',// wRight (%)
            'TINYINT NOT NULL',// vGap (px)
            'TINYINT NOT NULL',// hGap (px)
            'TINYINT NOT NULL'// hApp (vh)
        ]) ) return true;
        else return $db->lastError();
    }
}

?>