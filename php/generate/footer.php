<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/load.php';

function footer(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();
    $sites = $db->select('sites', ['owner'], $db->whereInt('id',1));
    $lastError = $db->lastError();
    $db->close();

    if(!$sites) {
        return new Reply(false, $lastError);
    }
    
     $site = $sites[0];
     return loadForm('framework/html/footer', [
            'owner' => $site['owner'],
            'year' => Date('Y')
        ]);
}
?>