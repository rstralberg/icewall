<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, [])) {

    $db = db_open($args->key);
    $users = db_select($db, 'users', ['*'], null, db_order_by('username', 'asc'));
    db_close($db);

    if( $users === false ) {
        send_reject('Kunde inte ladda användarna');
        exit(0);
    }
    else if ( gettype($users) === 'string') {
        send_reject($users);
        exit(0);
    }

    $options = '';
    for($i=0; $i<count($users); $i++) {
        $options .= '<option value="'. $users[$i]['username'].'">'.$users[$i]['fullname'].'</option>';
    }

    send_resolve( load_form(__DIR__ . '/_edit_users', [
        'users' => $options,
        'size' => 128
    ]));
}

?>
