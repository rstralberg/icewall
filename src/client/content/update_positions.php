<?php


require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['contents'])) {

    $db = db_open($args->key);

    foreach($args->contents as $cpos) {
        db_update($db, 'contents',
        ['pos'],
        [$cpos->pos],
        db_where($db, 'id', $cpos->id));
    }
    db_close($db);

    send_resolve(true);
    exit(0);
}
