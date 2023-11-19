<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_html.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['username'])) {

    $db = db_open($args->key);

    $html = '';
    $avatarResque = 'sites/' . $args->key . '/images/avatar.png'; // if everything else fails
    if ($args->username && !empty($args->username)) {
        $users = db_select($db, 'users', ['picture'], db_where($db, 'username', $args->username));
        if ($users !== false) {
            $resolution = 200;
            $user = $users[0];
            $logoSrc = 'sites/' . $args->key . '/users/'. $resolution  . '/' . $user['picture'];
            if (!file_exists(__DIR__ . '/../../../public/' . $logoSrc)) {
                $logoSrc = $logoResque;
            }
            $html .= '<a href="" onclick="logout()">
                        <img class="avatar-img" src="' . $logoSrc . '" alt="' . $user['username'] . '">
                    </a>';
        }
    } else {
        $html .= '<a href="" onclick="login()">
            <img class="avatar-img" src="' . $logoSrc . '" alt="">
        </a>';
    }
    send_resolve( compress_html($html) );

}
