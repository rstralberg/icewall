<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/settings.php';

function editSettings(stdClass|null $args) : Reply {

    $mysqli = dbConnect();
    $settings = selectSettings($mysqli)[0];
    dbDisonnect($mysqli);

    return loadForm('settings/html/edit', [
        'size' => 128 ,
        'logo' => $settings['logo'],
        'name' => $settings['name'],
        'owner' => $settings['owner']
    ]);
}
?>
