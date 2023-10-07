<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../../html/load.php';

function onWeblink(stdClass $args) : Reply {

    return load_requested_page('weblink', [
        'text' => $args->text,
        'cursorpos' => $args->cursorPos
    ]);

}
?>