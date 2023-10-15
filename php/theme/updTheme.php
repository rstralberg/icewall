<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/theme.php';


function themeUpdate(stdClass $args) : Reply{

    $db = new Db($args->database); 
    $db->open();
    
    $id = updateTheme($db, $args->theme[0], $args->theme); 
    
    $db->close();

    return new Reply( 
        $id>0 ? 'ok' : 'error',
        $id>0 ? $id : $db->lastError());
}


?>
