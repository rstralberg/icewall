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
                'VARCHAR(64) NOT NULL DEFAULT \'admin\' UNIQUE',
                'VARCHAR(256) NOT NULL DEFAULT \'Administrator\'',
                'VARCHAR(256) NOT NULL DEFAULT \'email@email.se\'',
                'VARCHAR(128) NOT NULL DEFAULT \'/icons/icewall-180x180.png\'',
                'VARCHAR(256) NOT NULL DEFAULT \'' . password_hash('winterfall', PASSWORD_DEFAULT) . '\''
                ]) ) return true;
        else return $db->lastError();
    }
}


?>
