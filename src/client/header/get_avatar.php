<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_html.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['username'])) {

    $db = db_open($args->key);

    $resolution = 200;
    $html = '';
    $avatarResque = 'sites/' . $args->key . '/images/avatar.png'; // if everything else fails
    if ($args->username && !empty($args->username)) {
        $users = db_select($db, 'users', ['picture', 'username'], db_where($db, 'username', $args->username));
        if ($users !== false) {
            $user = $users[0];
            $logoSrc = 'sites/' . $args->key . '/users/'. $resolution  . '/' . $user['picture'];
            if (!file_exists(__DIR__ . '/../../../public/' . $logoSrc)) {
                $logoSrc = $logoResque;
            }
            $html .= '<a href="#" onclick="logout()">
                        <figure>
                        <img class="avatar-img" src="' . $logoSrc . '" alt="' . $user['username'] . '">
                        <figcaption>'.$args->username.'</figcaption>
                        </figure>
                    </a>';
        }
    } else {
        $logoSrc = 'sites/' . $args->key . '/users/'. $resolution  . '/avatar.png';
        $html .= 
        '<a href="#" onclick="login()">
            <img class="avatar-img" src="' . $logoSrc . '" alt="">
        </a>';
    }
    send_resolve( compress_html($html) );

}
