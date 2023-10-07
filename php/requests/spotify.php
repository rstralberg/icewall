<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../../html/load.php';

function onSpotify(stdClass|null $args) : Reply {

    return load_requested_page('spotify', [ 
        'url' => $args->url
    ]);
}
?>
