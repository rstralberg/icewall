<?php

require_once __DIR__ . '/../settings/settings.php';
require_once __DIR__ . '/../utils/load.php';

function footer(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();
    $settingsRecords = selectSettings($db);
    $db->close();

    if(!$settingsRecords) {
        return new Reply( 'error','Kunde inte ladda uppgifter om ägare från inställningar');
    }
    
     $settings = $settingsRecords[0];
     return loadForm('framework/html/footer', [
            'owner' => $settings['owner'],
            'year' => Date('Y')
        ]);
}
?>