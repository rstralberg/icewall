<?php

require_once __DIR__ . '/user.php';
require_once __DIR__ . '/../utils/load.php';

function newUser(stdClass|null $args) : Reply {
    return loadForm('user/html/newUser');
}
?>
