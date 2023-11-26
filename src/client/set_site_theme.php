<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['theme'])) {

    $db = db_open($args->key);
    $sites = db_update($db, 'sites', ['theme'], [$args->theme], db_where($db, 'id', 1));
    db_close($db);

    if ($sites === false) {
        send_reject('Kunde inte uppdatera val av tema ');
        exit(0);
    } 

    if ( gettype($sites) === 'string') {
        send_reject($sites);
        exit(0);
    } 

    send_resolve(json_encode($sites[0]));
}
