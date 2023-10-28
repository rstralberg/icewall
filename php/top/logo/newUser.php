<?php

require_once __DIR__ . '/user.php';
require_once __DIR__ . '/../../tools/loadForm.php';

function newUser(stdClass|null $args) : Reply {
    return loadForm(__DIR__ . 'newUser');
}
?>
