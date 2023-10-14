<?php

require_once __DIR__ . '/../utils/strings.php';
require_once __DIR__ . '/settings.php';

function settingsUpdate(stdClass $args) {

    $db = new Db($args->database); 
    $db->open();

    $logoImage = rawurldecode($args->logo);
    if( str_contains($logoImage, 'http' ) ) {
        $args->logo = 'uploads' . explode('uploads', $logoImage)[1];
    }
    $result = updateSettings($db,[
        $db->string( $args->name), 
        $db->string( $args->owner), 
        $db->string( $args->logo)
    ]);
    
    $db->close();
    return new Reply( $result ? 'ok' : 'error',  '');
}

?>
