<?php

require_once __DIR__ . '/../tools/loadForm.php';

function imageSelect(stdClass|null $args) : Reply {

    return loadForm('content/html/image', [ 
        'url' => $args->url,
        'size' => $args->size
    ]);
}
?>
