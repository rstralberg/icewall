<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['username', 'password'])) {

    $db = db_open($args->key);
    $users = db_select($db, 'users', ['*'], db_where($db, 'username', $args->username));

    if ($users === false) {
        db_close($db);
        send_reject('No such user');
    } else {
        db_close($db);
        $user = $users[0];
        $res = password_verify($args->password, $user['password']);
        if ($res) send_resolve(json_encode($user));
        else send_reject('Wrong password');
    }
}
