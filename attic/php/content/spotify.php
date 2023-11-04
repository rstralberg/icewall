<?php

require_once __DIR__ . '/../tools/loadForm.php';

function spotify(stdClass|null $args) : Reply {

    return loadForm('content/html/spotify', [ 
        'url' => $args->url
    ]);
}
?>
