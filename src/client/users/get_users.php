<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['username'])) {

    $db = db_open($args->key);
    $users = db_select($db, 'users', ['*'], null, db_order_by('username','asc'));
    db_close($db);

    if ($users === false) {
        send_reject('Kunde inte ladda användare');
        exit(0);
    } 
    if ( gettype($users) === 'string') {
        send_reject($users);
        exit(0);
    } 
      
    send_resolve(json_encode($users));
}
