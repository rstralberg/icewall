<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args)) {

    $db = db_open($args->key);
    $sites = db_select($db, 'sites', ['*'], db_where($db, 'key', $args->key));
    db_close($db);

    if ($sites === false) {
        send_reject('Failed to load site');
    } 
    send_resolve(json_encode($sites[0]));
}
