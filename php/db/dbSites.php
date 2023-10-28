<?php

require_once __DIR__ . '/dbTable.php';

class dbSites extends dbTable{

    public function __construct() { parent::__construct('sites');}
    
    public function create(db $db) : bool|string {

        if( $db->createTable($this->tableName, [
            'key',
            'title',
            'owner',
            'email'], [
                'VARCHAR(32) NOT NULL UNIQUE',
                'VARCHAR(128) NOT NULL',
                'VARCHAR(128) NOT NULL',
                'VARCHAR(128) NOT NULL'
        ]) ) return true;
        else return $db->lastError();
    }
}

function loadSites(): array
{
    $fh = fopen(__DIR__ . '/../../sites.json', 'r');
    if ($fh === null)
        die('IceWall: #ERROR. No sites defined. Aborting!');

    $text = fread($fh, 32000);
    fclose($fh);

    if ($text === null || $text === '') {
        die('IceWall: #ERROR. No sites defined. Aborting!');
    }

    $item = json_decode($text);

    $sites = array();
    for ($i = 0; $i < count($item->sites); $i++) {
        $site = $item->sites[$i];
        array_push($sites, [
            'key' => $site->key,
            'title' => $site->title,
            'owner' => $site->owner,
            'email' => $site->email]
        );
    }
    return $sites;
}
