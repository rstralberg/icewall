<?php

require_once __DIR__ . '/../utils/load.php';

function password(stdClass|null $args) : Reply {
    return loadForm('user/html/password');
}


?>
