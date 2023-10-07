<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/settings.php';
require_once __DIR__ . '/../../html/load.php';

function onEditSettings(stdClass|null $args) : Reply {

    $mysqli = dbConnect();
    $settings = selectSettings($mysqli)[0];
    dbDisonnect($mysqli);

    return load_requested_page('edit_settings', [
        'size' => 128 ,
        'logo' => $settings['logo'],
        'name' => $settings['name'],
        'owner' => $settings['owner'],
        'host' => $settings['host'],
    ]);
}
?>
