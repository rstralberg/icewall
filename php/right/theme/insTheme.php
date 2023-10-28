<?php

require_once __DIR__ . '/../../tools/loadForm.php';
require_once __DIR__ . '/theme.php';

function insTheme(stdClass $args) : Reply{

    $db = new Db($args->database); 
    $db->open();
    
    $args->theme[0] = "'" . $args->name . "'";
    $id = insertTheme($db, $args->theme); 
    $lastError = $db->lastError();
    $db->close();

    if( $id>0 )
        return new Reply( true, $id ) ;
    else
        return new Reply( false, $lastError);
}


?>
