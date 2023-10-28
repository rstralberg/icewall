<?php

require_once __DIR__ . '/../../db/db.php';

function logo(Db $db, string $username): string
{
    // need some settings info
    $srecs = $db->select('settings', ['key', 'owner', 'logo'], $db->name('id').'=1');
    if (!$srecs) {
        // No idea to continue without settings!!!!
        die('Failed to load website settings');
    }
    $settings = $srecs[0];

    // which image to use as logo
    // either the user picture is a user is logged in
    // the company logo if not

    $logo = '';
    $logoResque = 'icons/icewall-512x512.png'; // if everything else fails 
    if( $username && !empty($username)) {
        $users = $db->select('user', ['picture'], $db->name('username').'='.$db->string($username));
        if( $users ) {
            $user = $users[0];
            $logoSrc = 'sites/' . $settings['key'] . '/images' . '/' . $user['picture'];
            if( !file_exists(__DIR__ . '/../../public/' . $logoSrc) ) {
                $logoSrc = $logoResque;
            }
            $logo = '<a href="#" onclick="evLogout()">
                        <img style="width:32px;height:auto" src="' . $logoSrc . '" alt="'.$user['username'].'">
                    </a>';
            }
    }
    else {
        $logoSrc = 'sites/' . $settings['key'] . '/images' . '/' . $settings['logo'];
        if( !file_exists(__DIR__ . '/../../public/' . $logoSrc) ) {
            $logoSrc = $logoResque;
        }
        $logo = '<a href="#" onclick="webForm(\'login\')">
        <img style="width:32px;height:auto" src="' . $logoSrc . '" alt="">
        </a>';
    }
    return $logo;
}
