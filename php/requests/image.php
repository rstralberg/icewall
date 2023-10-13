<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../../html/load.php';

function onImageSelect(stdClass|null $args) : Reply {

    return load_requested_page('image', [ 
        'url' => $args->url,
        'size' => $args->size
    ]);
}
?>
