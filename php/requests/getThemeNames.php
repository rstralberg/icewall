<?php

require_once __DIR__ . '/../storage/themes.php';

function onGetThemeNames(stdClass|null $args) : Reply {

    $mysqli = dbConnect();
    $themenames = selectThemeNames($mysqli);
    if( $themenames ) {
        return new Reply('ok', json_encode($themenames));
    }
    return new Reply('error', 'Hittade några teman');
}
?>
