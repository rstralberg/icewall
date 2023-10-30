<?php

require_once __DIR__ . '/../tools/loadForm.php';

function soundcloud(stdClass|null $args) : Reply {

    return loadForm('content/html/soundcloud', [ 
        'url' => $args->url
    ]);
}
?>
