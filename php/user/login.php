<?php

require_once __DIR__ . '/user.php';
require_once __DIR__ . '/../tools/loadForm.php';

function login(stdClass|null $args) : Reply {
    return loadForm('user/html/login');
}
?>
