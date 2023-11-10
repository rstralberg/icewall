<?php

require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

// ${title}
// ${msg}
// ${isError}

if (verify_client_args($args, ['title', 'message'])) {

    send_resolve( load_form(__DIR__.'/_popup', [
        'title' => $args->title,
        'msg' => $args->message,
    ]) );
}

    

?>
