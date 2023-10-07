<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/users.php';
require_once __DIR__ . '/../../html/load.php';

function onLogin(stdClass|null $args) : Reply {

    return load_requested_page('login');
}
?>
