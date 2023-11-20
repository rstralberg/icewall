<?php

require_once __DIR__ . '/../../../utils/load_form.php';
require_once __DIR__ . '/../../../utils/send_reply.php';
require_once __DIR__ . '/../../../utils/verify_client_args.php';

// ${url}
// ${text}

if (verify_client_args($args, ['url', 'text'])) {

    send_resolve( load_form(__DIR__.'/weblink', [
        'url' => $args->url,
        'text' => $args->text
    ]) );
}

    

?>
