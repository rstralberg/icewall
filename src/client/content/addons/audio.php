<?php

require_once __DIR__ . '/../../../utils/load_form.php';
require_once __DIR__ . '/../../../utils/send_reply.php';
require_once __DIR__ . '/../../../utils/verify_client_args.php';

// ${url}
// ${comment}

if (verify_client_args($args, ['url', 'comment'])) {

    send_resolve( load_form(__DIR__.'/audio', [
        'url' => $args->url,
        'comment' => $args->comment
    ]) );
}

    

?>
