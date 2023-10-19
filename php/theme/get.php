<?php

require_once __DIR__ . '/theme.php';


function getTheme(stdClass|null $args): Reply
{
    $db = new Db($args->database); 
    $db->open();

    $themes = selectTheme($db, $args->themeName);
    if (!$themes) {
        $db->close();
        return new Reply(false, 'Hittade inga teman');
    }
    $db->close();
    return new Reply(true, json_encode($themes[0]));
}


function getThemeNames(stdClass|null $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    $themenames = selectThemeNames($db);
    if( $themenames ) {
        $db->close();
        return new Reply(true, json_encode($themenames));
    }
    $db->close();
    return new Reply(false, 'Fanns inga teman');
}

?>