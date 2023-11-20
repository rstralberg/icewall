<?php


require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['id', 'pos', 'style', 'html', 'isPublic'])) {

    $db = db_open($args->key);

    $res = db_update($db, 'contents',
        ['pos', 'style', 'html','isPublic'],
        [$args->pos, $args->style, $args->html, $args->isPublic],
        db_where($db, 'id', $args->id));

    db_close($db);

    if( $res === false ) {
        send_reject('Failed to update content');
    } else if ( gettype($res) === 'string' ) {
        send_reject($res);
    } else {
        send_resolve(true);
    }
    exit(0);
}
