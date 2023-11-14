<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['theme','font', 'left', 'width', 'vGap', 'radius', 'linkFg', 'appBg'])) {

    $db = db_open($args->key);

    $res = db_update($db, 'themes',
        ['font','left','width','vGap','radius','linkFg','appBg'],
        [$args->font,$args->left,$args->width,$args->vGap,$args->radius,$args->linkFg,$args->appBg],
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
