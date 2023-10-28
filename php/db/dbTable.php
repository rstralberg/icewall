<?php

require_once __DIR__ . '/db.php';

abstract class dbTable {

    public $tableName;
    
    function __construct(string $tableName)
    {
        $this->tableName = $tableName;
    }
        
    public function exist(db $db) : bool { return $db->tableExist($this->tableName); }
    public function drop(db $db) : bool|string { return $db->drop($this->tableName); }

    abstract public function create(db $db) : bool|string;
}