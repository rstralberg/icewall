<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_html.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['title', 'owner', 'email', 'logo','theme'])) {

    $db = db_open($args->key);
    
    $res = db_update($db, 'sites', 
        ['title', 'owner', 'email', 'logo','theme'],
        [$args->title, $args->owner, $args->email, $args->logo, $args->theme],
        db_where($db, 'key', $args->key));
    
    $sites = db_select($db, 'sites', ['*'], db_where($db, 'key', $args->key));
    db_close($db);

    if( $res === false ) {
        send_reject('Kunde inte uppdatera inställningarna');
        exit(0);
    }
    else if ( gettype($res) === 'string ') {
        send_reject($res);
        exit(0);
    }
    
    send_resolve(json_encode($sites[0]));
    exit(0);
}
