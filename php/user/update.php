<?php

require_once __DIR__ . '/../utils/strings.php';
require_once __DIR__ . '/user.php';

function userUpdate(stdClass $args)
{

    $db = new Db($args->database); 
    $db->open();

    if (str_contains($args->picture, 'http')) {
        $args->picture = 'uploads' . explode('uploads', $args->picture)[1];
    }
    $users = selectUser($db, $args->username);
    $result = false;
    if (!$users) {
        $result = insertUser($db, [
            $db->string( $args->username),
            $db->string( $args->fullname),
            $db->string( $args->email),
            $db->string( $args->picture),
            $db->string( password_hash($args->password, PASSWORD_DEFAULT)),
            $db->bool($args->permPage),
            $db->bool($args->permContent),
            $db->bool($args->permUser),
            $db->bool($args->permTheme),
            $db->bool($args->permSettings)
        ]) > 0;
    } else {
        $result = updateUser($db, $args->username, [
            $db->string( $args->fullname),
            $db->string( $args->email),
            $db->string( $args->picture),
            $db->bool($args->permPage),
            $db->bool($args->permContent),
            $db->bool($args->permUser),
            $db->bool($args->permTheme),
            $db->bool($args->permSettings)
        ]);
    }
    $db->close();
    return new Reply($result ? 'ok' : 'error', $args->username);
}

?>