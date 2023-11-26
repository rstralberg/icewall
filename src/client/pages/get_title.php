<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

    $db = db_open($args->key);
    $pages = db_select($db, 'pages', ['*'], db_where($db, 'id', $args->pageid));
    db_close($db);
    
    if ($pages === false) {
        send_reject('Requested page does not exist and has no title');
        return;
    }

    $page = $pages[0];
    send_resolve( load_form(__DIR__.'/get_title', [
            'author' => $page['author'],
            'title' => $page['title']
    ]));
}
