<?php

require_once __DIR__ . '/user.php';

function deleteAccount(stdClass $args) : Reply {

    $mysqli = dbConnect();
    deleteUser($mysqli, $args->username);
    dbDisonnect($mysqli);

    return new Reply('ok', true);
}
?>
