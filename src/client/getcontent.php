<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

    $db = db_open($args->key);
    $contents = db_select($db, 'contents', ['*'], db_where($db, 'pageId', $args->pageid), db_order_by('pos', 'asc'));

    if ($contents === false) {
        db_close($db);
        send_reject('Sidan saknar innehåll');
    } else {
        db_close($db);
        send_resolve(json_encode($contents));
    }
}
