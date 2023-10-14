<?php

require_once __DIR__ . '/user.php';

function deleteAccount(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    deleteUser($db, $args->username);
    
    $db->close();

    return new Reply('ok', true);
}
?>
