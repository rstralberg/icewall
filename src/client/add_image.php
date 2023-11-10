<?php

require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

// ${size}
// ${url}
// ${caption}

if (verify_client_args($args, ['size', 'url', 'caption'])) {

    send_resolve( load_form(__DIR__.'/_add_image', [
        'size' => $args->size,
        'url' => $args->url,
        'caption' => $args->caption
    ]) );
}
    
