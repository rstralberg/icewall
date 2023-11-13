<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['theme', 'nbarH','nbarBold','nbarItalic','nbarFsize','nbarBgHi','nbarFgHi' ])) {

    $db = db_open($args->key);

    $res = db_update($db, 'themes',
        ['nbarH','nbarBold','nbarItalic','nbarFsize','nbarBgHi','nbarFgHi'],
        [$args->nbarH,$args->nbarBold,$args->nbarItalic,$args->nbarFsize,$args->nbarBgHi,$args->nbarFgHi],
        db_where($db, 'name', $args->theme));
    db_close($db);

    if( $res === false ) {
        send_reject('Kunde inte uppdatera temat');
    }
    else if( gettype($res) === 'string' ) {
        send_reject($res);
    }
    else {
        send_resolve(true);
    }
    exit(0);
}
