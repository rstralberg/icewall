<?php

require_once __DIR__ . '/../utils/strings.php';
require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/settings.php';

function onUpdateSettings(stdClass $args) {

    $mysqli = dbConnect();

    $logoImage = rawurldecode($args->logo);
    if( str_contains($logoImage, 'http' ) ) {
        $args->logo = 'uploads' . explode('uploads', $logoImage)[1];
    }
    $result = updateSettings($mysqli,[
        sqlString( $mysqli, $args->name), 
        sqlString( $mysqli, $args->owner), 
        sqlString( $mysqli, $args->logo), 
        sqlString( $mysqli, $args->host)
    ]);
    
    dbDisonnect($mysqli);
    return new Reply( $result ? 'ok' : 'error',  '');
}

?>
