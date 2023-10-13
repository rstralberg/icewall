<?php

require_once __DIR__ . '/../utils/load.php';

function password(stdClass|null $args) : Reply {

    return loadForm('user/html/password');
}

function update_Password(stdClass $args) {

    $mysqli = dbConnect();
    updatePassword($mysqli, $args->username, $args->password);
    dbDisonnect($mysqli);
    return new Reply( 'ok', true);
}


?>
