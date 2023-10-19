<?php

require_once __DIR__ . '/user.php';
require_once __DIR__ . '/../utils/image.php';
require_once __DIR__ . '/../utils/load.php';

function editAccount(stdClass $args) : Reply {

    
    $reply = getUser($args);
    if( !$reply->ok ) {
        return $reply;
    }
    $user = json_decode($reply->content);
    $pic = safeImageFile($args->key,'sites/' . $args->key . '/images/' . $user->picture);
    return loadForm('user/html/editAccount', [
            'username' => $user->username,
            'picture' => $pic,
            'fullname' => $user->fullname,
            'email' => $user->email,
            'size' => 128
        ]);
}

function editUsers(stdClass $args) : Reply {

    $reply = getUserNames($args);
    if( !$reply->ok) {
        return $reply;
    }
    
    $names = json_decode($reply->content);
    $options = '';
    for($i=0; $i<count($names); $i++) {
        $name = $names[$i]->username;
        $options .= '<option value="'. $name.'">'.$name.'</option>';
    }

    return loadForm('user/html/editUsers', [
        'users' => $options,
        'size' => 128
    ]);
}

?>
