<?php

require_once __DIR__ . '/../tools/loadForm.php';

function audio(stdClass $args) : Reply {

    return loadForm('content/html/audio', [ 
        'url' => $args ? $args->url : '',
        'comment' => $args ? $args->comment : ''
    ]);
}
?>
