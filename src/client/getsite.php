<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args)) {

    $db = db_open($args->key);
    $sites = db_select($db, 'sites', ['*'], db_where($db, 'key', $args->key));

    if ($sites === false) {
        db_close($db);
        send_reject('Failed to load sites');
    } else {
        db_close($db);
        send_resolve(json_encode($sites[0]));
    }
}
