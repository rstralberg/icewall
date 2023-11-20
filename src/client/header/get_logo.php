<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_html.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, [])) {

    $db = db_open($args->key);

    $sites = db_select($db, 'sites', ['title','logo'], db_where($db, 'key', $args->key));
    if (!$sites) {
        db_close($db);
        send_reject('Failed to load logo');
        return;
    }
    $site = $sites[0];

    $logo = '';
    $logoResque = 'sites/' . $args->key . '/images/icewall-512x512.png'; // if everything else fails
    $logoSrc = 'sites/' . $args->key . '/images/200/' . $site['logo'];
    $path = realpath( __DIR__ . '/../../../public/' . $logoSrc);
    if (!file_exists($path)) {
        $logoSrc = $logoResque;
    }
    send_resolve( compress_html('<a href="" onclick="logo_clicked()">
                <img class="logo" src="' . $logoSrc . '" alt="' . $site['title'] . '">
            </a>'));
}

