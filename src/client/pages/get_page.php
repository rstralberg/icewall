<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

    $db = db_open($args->key);
    $pages = db_select($db, 'pages', ['*'], db_where($db, 'id', $args->pageid));

    if ($pages === false) {
        db_close($db);
        send_reject('Kunde inte ladda sidan');
        exit(0);
    } 

    if (gettype($pages) === 'string') {
        db_close($db);
        send_reject($pages);
        exit(0);
    } 
    
    db_close($db);
    send_resolve(json_encode($pages[0]));
}
