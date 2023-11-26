<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['username'])) {

    $db = db_open($args->key);
    $users = db_select($db, 'users', ['id','username','fullname','email','picture'], db_where($db, 'username', $args->username));
    db_close($db);

    if ($users === false) {
        send_reject('Kunde inte ladda användaren');
        exit(0);
    } 
    if ( gettype($users) === 'string') {
        send_reject($users);
        exit(0);
    } 
      
    $user = $users[0];
    send_resolve(json_encode($user));
}
