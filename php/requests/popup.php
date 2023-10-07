<?php

require_once __DIR__ . '/../../html/load.php';

function onPopup(stdClass|null $args) : Reply {

    return load_requested_page('popup', [
        'title' => $args->title,
        'msg' => $args->message

    ]);
}
?>
