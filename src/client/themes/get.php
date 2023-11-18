<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['theme'])) {

    $db = db_open($args->key);
    $themes = db_select($db, 'themes', ['*'], db_where($db, 'name', $args->theme));
    db_close($db);

    if ($themes === false) {
        send_reject('Kunde inte temat');
        exit(0);
    } 
    if ( gettype($themes) === 'string') {
        send_reject($themes);
        exit(0);
    } 
      
    $theme = $themes[0];
    send_resolve(json_encode($theme));
}
