<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

    $db = db_open($args->key);

    $sites = db_select($db, 'sites', ['title'], db_where($db, 'key', $args->key));

    $res = db_insert($db, 'contents',
        ['pageId', 'pos', 'style', 'html', 'isPublic'],
        [$args->pageid, 0, '', $sites[0]['title'], 0]);

    if ($res === false) {
        send_reject('Failed to create new content');
    } else if (gettype($res) === 'string') {
        send_reject($res);
    } else {
        $contents = db_select($db, 'contents', ['*'], db_where($db, 'id', $res));
        if ($contents === false) {
            send_reject('Failed to create new content');
        } else if (gettype($contents) === 'string') {
            send_reject($contents);
        } else {
            send_resolve(json_encode($contents[0]));
        }
    }

}
