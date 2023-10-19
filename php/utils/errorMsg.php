<?php

require_once __DIR__ . '/load.php';

function errorMsg(stdClass $args) : Reply {

    return loadForm('utils/html/error', [
        'msg' => $args->message,
        'stack' => $args->stack

    ]);
}
?>
