<?php

require_once __DIR__ . '/../../../utils/load_form.php';
require_once __DIR__ . '/../../../utils/send_reply.php';
require_once __DIR__ . '/../../../utils/verify_client_args.php';

// ${url}
// ${comment}

if (verify_client_args($args, ['url', 'callback'])) {

    send_resolve( load_form(__DIR__.'/spotify', [
        'url' => $args->url,
        'callback' => $args->callback
    ]) );
}

    

?>
