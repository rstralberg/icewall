<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/load.php';

function footer(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();
    $settings = $db->select('settings', ['owner'], $db->name('id').'=1');
    $lastError = $db->lastError();
    $db->close();

    if(!$settings) {
        return new Reply(false, $lastError);
    }
    
     $setting = $settings[0];
     return loadForm('framework/html/footer', [
            'owner' => $setting['owner'],
            'year' => Date('Y')
        ]);
}
?>