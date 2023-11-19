<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['theme', 'markBg', 'markFg', 'markBorder', 'markShadow','markFsize', 'markBold', 'markItalic'])) {

    $db = db_open($args->key);

    $res = db_update($db, 'themes',
        ['markBg', 'markFg', 'markBorder', 'markShadow','markFsize', 'markBold', 'markItalic'],
        [$args->markBg, $args->markFg, $args->markBorder, $args->markShadow, $args->markFsize, $args->markBold, $args->markItalic],
        db_where($db, 'name', trim($args->theme,'"')));
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
