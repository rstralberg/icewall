<?php

require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

// ${msg}

if (verify_client_args($args, ['message'])) {

    send_resolve( load_form(__DIR__.'/error', [
        'msg' => $args->message,
    ]) );
}

    

?>
