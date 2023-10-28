<?php

require_once __DIR__ . '/user.php';
require_once __DIR__ . '/../../tools/image.php';
require_once __DIR__ . '/../../tools/loadForm.php';

function editAccount(stdClass $args) : Reply {

    
    $reply = getUser($args);
    if( !$reply->ok ) {
        return $reply;
    }
    $user = json_decode($reply->content);
    $pic = safeImageFile($args->key,'sites/' . $args->key . '/images/' . $user->picture);
    return loadForm(__DIR__ . '/editAccount', [
            'username' => $user->username,
            'picture' => $pic,
            'fullname' => $user->fullname,
            'email' => $user->email,
            'size' => 128
        ]);
}

?>
