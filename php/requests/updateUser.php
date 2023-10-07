<?php

require_once __DIR__ . '/../utils/strings.php';
require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/users.php';

function onUpdateUser(stdClass $args) {

    $mysqli = dbConnect();

    if( str_contains($args->picture, 'http' ) ) {
        $args->picture = 'uploads' . explode('uploads', $args->picture)[1];
    }
    $users = selectUser($mysqli, $args->username); 
    $result = false;
    if( !$users ) {
        $result = insertUser($mysqli, [
            sqlString( $mysqli, $args->username),
            sqlString( $mysqli, $args->fullname),
            sqlString( $mysqli, $args->email),
            sqlString( $mysqli, $args->picture),
            sqlString( $mysqli, password_hash($args->password, PASSWORD_DEFAULT)),
            $args->permPages?1:0,
            $args->permBlocks?1:0,
            $args->permUsers?1:0,
            $args->permThemes?1:0,
            $args->permSettings?1:0
        ]) > 0;
    } 
    else {
    $result = updateUser($mysqli, $args->username, [
        sqlString( $mysqli, $args->fullname),
        sqlString( $mysqli, $args->email),
        sqlString( $mysqli, $args->picture),
        $args->permPages?1:0,
        $args->permBlocks?1:0,
        $args->permUsers?1:0,
        $args->permThemes?1:0,
        $args->permSettings?1:0
]);
    }
    dbDisonnect($mysqli);
    return new Reply( $result ? 'ok' : 'error',  $args->username);
}

?>
