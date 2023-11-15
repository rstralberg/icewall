<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, [])) {

    $db = db_open($args->key);
    $sites = db_select($db, 'sites', ['*'], db_where($db, 'id', 1));
    $themes = db_select($db, 'themes', ['name'], null, db_order_by('name', 'asc'));
    db_close($db);

    if( $sites === false ) {
        send_reject('Kunde inte ladda inställningarna');
        exit(0);
    }
    else if ( gettype($sites) === 'string') {
        send_reject($sites);
        exit(0);
    }

    $site = $sites[0];
    $options = '';
    for($i=0; $i<count($themes); $i++) {
        if( $themes[$i]['name'] === $sites['theme']) {
            $options .= '<option selected value="'. $themes[$i]['name'].'">'.$themes[$i]['name'].'</option>';
        }
        else {
            $options .= '<option value="'. $themes[$i]['name'].'">'.$themes[$i]['name'].'</option>';
        }
    }

    send_resolve( load_form(__DIR__ . '/sys_settings_form', [
        'name' => $site['title'],
        'owner' => $site['owner'],
        'email' => $site['email'],
        'themes' => $options 
    ]));
}

?>
