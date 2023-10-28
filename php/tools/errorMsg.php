<?php

require_once __DIR__ . '/loadForm.php';

function errorMsg(stdClass $args) : Reply {

    return loadForm(__DIR__ . '/error', [
        'msg' => $args->message,
        'stack' => $args->stack

    ]);
}
?>
