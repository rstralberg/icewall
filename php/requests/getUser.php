<?php

require_once __DIR__ . '/../storage/users.php';

function onGetUser(stdClass $args) : Reply {

    $mysqli = dbConnect();

    $users = selectUser($mysqli, $args->username);
    if( $users ) {
        $user = $users[0];
        return new Reply('ok', json_encode($user));
    }
    return new Reply('error', 'Hittade inte användaren "'.$args->username.'"');
}
?>
