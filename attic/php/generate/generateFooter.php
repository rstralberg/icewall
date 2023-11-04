<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../tools/loadForm.php';

function generateFooter(stdClass $args) : Reply {

    $db = new db(); 
    $db->open($args->database);
    $sites = $db->select('sites', ['owner'], $db->where('id',1));
    $lastError = $db->lastError();
    $db->close();

    if(!$sites) {
        return new Reply(false, $lastError);
    }
    
     $site = $sites[0];
     return loadForm(__DIR__.'/_footer', [
            'owner' => $site['owner'],
            'year' => Date('Y')
        ]);
}
?>