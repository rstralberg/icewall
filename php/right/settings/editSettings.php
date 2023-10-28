<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/../../tools/loadForm.php';

function editSettings(stdClass $args) : Reply {

    $argErr = argError('editSettings', $args, []);
    if( $argErr ) return $argErr;

    $db = new Db($args->database);
    $db->open();

    $settings = $db->select('settings', ['*'], 'id=1');

    $lastError = $db->lastError();
    $db->close();

    if( !$settings ) return new Reply(false, '#' . $lastError);
    $setting = $settings[0];

    return loadForm(__DIR__ . '/editSettings', [
        'name' => $setting['name'],
        'url' => $setting['url'],
        'owner' => $setting['owner'],
        'logo' => 'sites/' . $args->key . '/images/' . $setting['logo'],
        'admin' => $setting['admin'],
        'email' => $setting['email'],
        'size' => 128
    ]);
}

?>
