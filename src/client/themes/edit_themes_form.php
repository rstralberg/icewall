<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, [])) {

    $db = db_open($args->key);
    $themes = db_select($db, 'themes', ['name'], null, db_order_by('name', 'asc'));
    db_close($db);

    if( $themes === false ) {
        send_reject('Kunde inte ladda teman');
        exit(0);
    }
    else if ( gettype($themes) === 'string') {
        send_reject($themes);
        exit(0);
    }

    $options = '';
    for($i=0; $i<count($themes); $i++) {
        $options .= '<option value="'. $themes[$i]['name'].'">'.$themes[$i]['name'].'</option>';
    }

    send_resolve( load_form(__DIR__ . '/edit_themes_form', [
        'themes' => $options
    ]));
}

?>
