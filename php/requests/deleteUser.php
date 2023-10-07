<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/users.php';

function onDeleteUser(stdClass $args) : Reply {

    $mysqli = dbConnect();

    deleteUser($mysqli, $args->username);

    dbDisonnect($mysqli);

    return new Reply('ok', true);
}
?>
