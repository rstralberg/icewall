<?php

require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

// ${title}
// ${msg}
// ${yes}
// ${no}

if (verify_client_args($args, ['title', 'message', 'yes', 'no'])) {

    send_resolve( load_form(__DIR__.'/_yesno', [
        'title' => $args->title,
        'msg' => $args->message,
        'yes' => $args->yes,
        'no' => $args->no
    ]) );
}

    

?>
