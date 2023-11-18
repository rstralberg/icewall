<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['username'])) {

    $db = db_open($args->key);

    $res = db_delete($db, 'users', db_where($db, 'username', $args->username));
    db_close($db);

    if( $res === false ) {
        send_reject('Kunde inte radera användaren');
        exit(0);
    }
    else if ( gettype($res) === 'string') {
        send_reject($res);
        exit(0);
    }

    send_resolve(true);
}

?>
