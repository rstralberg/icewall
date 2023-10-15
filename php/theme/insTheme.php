<?php

require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/theme.php';

function insTheme(stdClass $args) : Reply{

    $db = new Db($args->database); 
    $db->open();
    
    $args->theme[0] = "'" . $args->name . "'";
    $id = insertTheme($db, $args->theme); 
    
    $db->close();

    return new Reply( 
        $id>0 ? 'ok' : 'error',
        $id>0 ? $id : $db->lastError());
}


?>
