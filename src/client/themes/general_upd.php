<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, 
    ['theme','font', 'headerT', 'headerH', 'footerB', 'footerH', 'titleH', 
     'menuW', 'infoW', 'titleW', 'contentW', 'contentD', 'radius', 'linkFg', 'appBg'])) {

    $db = db_open($args->key);

    $res = db_update($db, 'themes',
        ['font', 'headerT', 'headerH', 'footerB', 'footerH', 'titleH', 
        'menuW', 'infoW', 'titleW', 'contentW', 'contentD', 'radius', 
        'linkFg', 'appBg'],
        [$args->font, $args->headerT, $args->headerH, $args->footerB, $args->footerH, $args->titleH, 
        $args->menuW, $args->infoW, $args->titleW, $args->contentW, $args->contentD, $args->radius,
        $args->linkFg, $args->appBg],
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
