<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/settings.php';
require_once __DIR__ . '/../../html/load.php';

function onFooter() : Reply {

    $mysqli = dbConnect();
    $settingsRecords = selectSettings($mysqli);
    dbDisonnect($mysqli);

    if(!$settingsRecords) {
        return new Reply( 'error','Kunde inte ladda uppgifter om ägare från inställningar');
    }
    
     $settings = $settingsRecords[0];
     return load_requested_page('footer', [
            'owner' => $settings['owner'],
            'year' => Date('Y')
        ]);
}
?>