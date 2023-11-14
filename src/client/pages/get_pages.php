<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['where'])) {

    $db = db_open($args->key);
    $pages = db_select($db, 'pages', ['*'], $args->where, db_order_by('pos', 'asc'));
    db_close($db);

    if ($pages === false) {
        send_reject('Failed to load page');
        exit(0);
    } 
    else if( gettype($pages) === 'string' ){
        send_reject($pages);
    } 
    else {
        send_resolve(json_encode($pages));
    }
}
