<?php

require_once __DIR__ . '/../utils/strings.php';
require_once __DIR__ . '/user.php';

function userUpdate(stdClass $args)
{

    $mysqli = dbConnect();

    if (str_contains($args->picture, 'http')) {
        $args->picture = 'uploads' . explode('uploads', $args->picture)[1];
    }
    $users = selectUser($mysqli, $args->username);
    $result = false;
    if (!$users) {
        $result = insertUser($mysqli, [
            sqlString($mysqli, $args->username),
            sqlString($mysqli, $args->fullname),
            sqlString($mysqli, $args->email),
            sqlString($mysqli, $args->picture),
            sqlString($mysqli, password_hash($args->password, PASSWORD_DEFAULT)),
            sqlBoolean($args->permPage),
            sqlBoolean($args->permContent),
            sqlBoolean($args->permUser),
            sqlBoolean($args->permTheme),
            sqlBoolean($args->permSettings)
        ]) > 0;
    } else {
        $result = updateUser($mysqli, $args->username, [
            sqlString($mysqli, $args->fullname),
            sqlString($mysqli, $args->email),
            sqlString($mysqli, $args->picture),
            sqlBoolean($args->permPage),
            sqlBoolean($args->permContent),
            sqlBoolean($args->permUser),
            sqlBoolean($args->permTheme),
            sqlBoolean($args->permSettings)
        ]);
    }
    dbDisonnect($mysqli);
    return new Reply($result ? 'ok' : 'error', $args->username);
}

?>