<?php

require_once __DIR__ . '/load.php';

function popup(stdClass|null $args) : Reply {

    return loadForm('utils/html/popup', [
        'title' => $args->title,
        'msg' => $args->message

    ]);
}
?>
