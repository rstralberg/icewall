<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['username','fullname','email','picture'])) {

    send_resolve( load_form(__DIR__ . '/edit_account', [
        'username' => $args->username,
        'fullname' => $args->fullname,
        'email' => $args->email,
        'picture' => 'sites/' . $args->key . '/users/200/' . $args->picture
    ]));
}

?>
