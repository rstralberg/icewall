<?php

require_once __DIR__ . '/dbTable.php';
require_once __DIR__ . '/../config.php';

class dbUsers extends dbTable {

    public function __construct() { parent::__construct('users');}

    public function create(db $db) : bool|string {
        if ( $db->createTable($this->tableName, [
                'username',
                'fullname',
                'email',
                'picture',
                'password'
            ],
            [
                'VARCHAR(64) NOT NULL UNIQUE',
                'VARCHAR(256) NOT NULL',
                'VARCHAR(256) NOT NULL',
                'VARCHAR(128) NOT NULL',
                'VARCHAR(256) NOT NULL'
                ]) ) return true;
        else return $db->lastError();
    }
}


?>
