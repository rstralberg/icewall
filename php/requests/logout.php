<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/users.php';
require_once __DIR__ . '/../../html/load.php';

function onLogout(stdClass $args) : Reply {
    return load_requested_page('logout', ['username' => $args->username]);
}
?>
