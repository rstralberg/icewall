<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/settings.php';

function editSettings(stdClass $args) : Reply {

    $db = new Db($args->database); $db->open();
    $settings = selectSettings($db)[0];
    $db->close();

    return loadForm('settings/html/edit', [
        'size' => 128 ,
        'logo' => $settings['logo'],
        'name' => $settings['name'],
        'owner' => $settings['owner']
    ]);
}
?>
