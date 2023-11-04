<?php

require_once __DIR__ . '/../tools/loadForm.php';

function weblink(stdClass $args) : Reply {

    return loadForm('content/html/weblink', [
        'text' => $args->text,
        'cursorpos' => $args->cursorPos
    ]);

}
?>