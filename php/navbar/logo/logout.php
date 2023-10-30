<?php

require_once __DIR__ . '/user.php';
require_once __DIR__ . '/../../tools/loadForm.php';

function logout(stdClass $args) : Reply {
    return loadForm(__DIR__ . '/logout', [
        'username' => $args->username,
        'disabled' => $args->username === 'admin' ? 'disabled':''
    ]);
}
?>
