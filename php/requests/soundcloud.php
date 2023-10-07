<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../../html/load.php';

function onSoundcloud(stdClass|null $args) : Reply {

    return load_requested_page('soundcloud', [ 
        'url' => $args->url
    ]);
}
?>
