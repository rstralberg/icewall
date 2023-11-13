<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['theme', 'btnH', 'btnBg', 'btnFg', 'btnBgHi', 'btnFgHi',
'btnBgDis', 'btnFgDis', 'btnBold', 'btnItalic', 'btnFsize', 'btnShadow', 'btnBorder' ])) {

    $db = db_open($args->key);

    $res = db_update($db, 'themes',
        ['btnH', 'btnBg', 'btnFg', 'btnBgHi', 'btnFgHi', 'btnBgDis', 'btnFgDis', 'btnBold',
         'btnItalic', 'btnFsize', 'btnShadow', 'btnBorder'],
        [$args->btnH, $args->btnBg, $args->btnFg, $args->btnBgHi, $args->btnFgHi, $args->btnBgDis, 
        $args->btnFgDis, $args->btnBold, $args->btnItalic, $args->btnFsize, $args->btnShadow, $args->btnBorder],
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
