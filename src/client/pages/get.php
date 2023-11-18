<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

    $db = db_open($args->key);
    $pages = db_select($db, 'pages', ['*'], db_where($db, 'id', $args->pageid));

    if ($pages === false) {
        db_close($db);
        send_reject('Failed to load page');
    } else {
        db_close($db);
        $page = $pages[0];
        send_resolve(json_encode($page));
    }
}
