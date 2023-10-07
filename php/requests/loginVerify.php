<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/users.php';

function onLoginVerify( stdClass $args) : Reply {

    $mysqli = dbConnect();

    $users = selectUser($mysqli, $args->username);
    if( !$users) {
        dbDisonnect($mysqli);
        return new Reply( 'error', 'Användaren "'. $args->username . '" finns inte');
    }   
    
    $result = verifyUser($mysqli, $args->username, $args->password );
    dbDisonnect($mysqli);

    if( $result ) {
        return new Reply('ok',$result);
    }
    else {
        return new Reply('error', 'Felaktig lösenord');
    }
}
