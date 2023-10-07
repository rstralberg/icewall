<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/users.php';
require_once __DIR__ . '/../../html/load.php';

function onEditAccount(stdClass|null $args) : Reply {

    $mysqli = dbConnect();

    $users = selectUser($mysqli, $args->username);
    if( $users ) {
        $user = $users[0];
        return load_requested_page('edit_account', [
            'username' => $user['username'],
            'picture' => $user['picture'],
            'fullname' => $user['fullname'],
            'email' => $user['email'],
            'size' => 128
        ]);
    }
    else {
        return new Reply('error', 'Kunde inte ladda "'.$args->username.'"');
    }
}
?>
