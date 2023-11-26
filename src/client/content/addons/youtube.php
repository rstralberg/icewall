<?php

require_once __DIR__ . '/../../../utils/load_form.php';
require_once __DIR__ . '/../../../utils/send_reply.php';
require_once __DIR__ . '/../../../utils/verify_client_args.php';

// ${url}
// ${comment}

if (verify_client_args($args, ['url'])) {

    send_resolve( load_form(__DIR__.'/youtube', [
        'url' => $args->url,
    ]) );
}

    

?>
