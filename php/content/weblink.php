<?php

require_once __DIR__ . '/../utils/load.php';

function weblink(stdClass $args) : Reply {

    return loadForm('content/html/weblink', [
        'text' => $args->text,
        'cursorpos' => $args->cursorPos
    ]);

}
?>