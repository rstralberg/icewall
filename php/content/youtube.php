<?php

require_once __DIR__ . '/../tools/loadForm.php';

function youtube(stdClass|null $args) : Reply {

    return loadForm('content/html/youtube', [ 
        'url' => $args->url
    ]);
}
?>
