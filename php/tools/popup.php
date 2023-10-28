<?php

require_once __DIR__ . '/loadForm.php';

function popup(stdClass $args) : Reply {

    return loadForm(__DIR__ . '/popup', [
        'title' => $args->title,
        'msg' => $args->message

    ]);
}
?>
