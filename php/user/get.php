<?php

require_once __DIR__ . '/user.php';

function getUser(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    $users = selectUser($db, $args->username);
    
    $db->close();

    if( $users ) {
        $user = $users[0];
        return new Reply('ok', json_encode($user));
    }
    return new Reply('error', 'Hittade inte användaren "'.$args->username.'"');
}
?>
