<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['username', 'fullname', 'email', 'picture', 'password'])) {

    $db = db_open($args->key);

    $res = db_insert($db, 'users', 
        ['username', 'fullname', 'email', 'picture', 'password'], 
        [$args->username, $args->fullname, $args->email, $args->picture, password_hash($args->password, PASSWORD_DEFAULT) ]);
    db_close($db);

    if( $res === false ) {
        send_reject('Kunde inte spara användaren');
        exit(0);
    }
    else if ( gettype($res) === 'string') {
        send_reject($res);
        exit(0);
    }

    send_resolve(true);
}

?>
