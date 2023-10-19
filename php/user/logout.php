<?php

require_once __DIR__ . '/user.php';
require_once __DIR__ . '/../utils/load.php';

function logout(stdClass $args) : Reply {
    return loadForm('user/html/logout', [
        'username' => $args->username,
        'disabled' => $args->username === 'admin' ? 'disabled':''
    ]);
}
?>
