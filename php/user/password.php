<?php

require_once __DIR__ . '/../utils/load.php';

function password(stdClass|null $args) : Reply {

    return loadForm('user/html/password');
}

function update_Password(stdClass $args) {

    $db = new Db($args->database); 
    $db->open();

    updatePassword($db, $args->username, $args->password);
    
    $db->close();
    return new Reply( 'ok', true);
}


?>
