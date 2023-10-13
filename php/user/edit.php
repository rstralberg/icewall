<?php

require_once __DIR__ . '/user.php';
require_once __DIR__ . '/../utils/load.php';

function editAccount(stdClass|null $args) : Reply {

    $mysqli = dbConnect();

    $users = selectUser($mysqli, $args->username);
    if( $users ) {
        $user = $users[0];
        return loadForm('user/html/editAccount', [
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

function editUsers(stdClass|null $args) : Reply {

    $mysqli = dbConnect();
    $users = selectUsers($mysqli);
    dbDisonnect($mysqli);

    $options = '';
    for($i=0; $i<count($users); $i++) {
        $options .= '<option value="'. $users[$i]['username'].'">'.$users[$i]['username'].'</option>';
    }

    return loadForm('user/html/editUsers', [
        'users' => $options,
        'size' => $args->size
    ]);
}

?>
