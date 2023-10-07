<?php

require_once __DIR__ . '/../storage/themes.php';

function onGetTheme(stdClass|null $args): Reply
{
    $mysqli = dbConnect();

    $themes = selectTheme($mysqli, $args->themeName);
    if (!$themes) {
        dbDisonnect($mysqli);
        return new Reply('error', 'Kunde inte ladda temat "' . $args->themeName . '"');
    }

    return new Reply('ok', json_encode($themes[0]));
}
?>