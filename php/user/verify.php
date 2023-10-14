<?php

require_once __DIR__ . '/user.php';

function loginVerify( stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    $users = selectUser($db, $args->username);
    if( !$users) {
        $db->close();
        return new Reply( 'error', 'Användaren "'. $args->username . '" finns inte');
    }   
    
    $result = verifyUser($db, $args->username, $args->password );
    $db->close();

    if( $result ) {
        return new Reply('ok',$result);
    }
    else {
        return new Reply('error', 'Felaktig lösenord');
    }
}
