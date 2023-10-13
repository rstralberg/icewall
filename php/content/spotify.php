<?php

require_once __DIR__ . '/../utils/load.php';

function spotify(stdClass|null $args) : Reply {

    return loadForm('content/html/spotify', [ 
        'url' => $args->url
    ]);
}
?>
