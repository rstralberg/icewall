<?php

require_once __DIR__ . '/../utils/strings.php';
require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/users.php';

function onUpdatePassword(stdClass $args) {

    $mysqli = dbConnect();
    updatePassword($mysqli, $args->username, $args->password);
    dbDisonnect($mysqli);
    return new Reply( 'ok', true);
}

?>
