<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../tools/loadForm.php';

function bottom(stdClass $args) : Reply {

    $db = new db(); 
    $db->open($args->database);
    $settings = $db->select('settings', ['owner'], $db->name('id').'=1');
    $lastError = $db->lastError();
    $db->close();

    if(!$settings) {
        return new Reply(false, '#' . $lastError);
    }
    
     $setting = $settings[0];
     return loadForm(__DIR__ . '/bottom', [
            'owner' => $setting['owner'],
            'year' => Date('Y')
        ]);
}
?>