<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../../html/load.php';

function onAudio(stdClass|null $args) : Reply {

    return load_requested_page('audio', [ 
        'url' => $args ? $args->url : '',
        'comment' => $args ? $args->comment : ''
    ]);
}
?>
