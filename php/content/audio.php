<?php

require_once __DIR__ . '/../utils/load.php';

function audio(stdClass|null $args) : Reply {

    return loadForm('content/html/audio', [ 
        'url' => $args ? $args->url : '',
        'comment' => $args ? $args->comment : ''
    ]);
}
?>
