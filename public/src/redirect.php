<?php

require_once __DIR__ . '/../../src/utils/send_reply.php';
require_once __DIR__ . '/../../src/utils/verify_client_args.php';

$data = file_get_contents('php://input');

if ($data===null) {
    send_reject('Empty request!');
    exit(0);
}

try {
    $args = json_decode($data);
    if ($args === null) {
        send_reject('Failed to decode request');
        exit(0);
    }

    if( !verify_client_args($args)) {
        exit(0);
    }
    $require  = __DIR__ . '/../../src/client/' . $args->php . '.php'; 
    require_once  $require;
} 
catch (Exception $ex) {
    send_reject($ex);
}
exit(0);

