<?php

require_once __DIR__ . '/../../tools/loadForm.php';

function password(stdClass|null $args) : Reply {
    return loadForm(__DIR__ . 'password');
}


?>
