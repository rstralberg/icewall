<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/load_html.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid', 'username'])) {

    $db = db_open($args->key);
    $pages = db_select($db, 'pages', ['*'], null, db_order_by('pos', 'asc'));

    if ($pages === false) {
        // No idea to continue without pages!!!!
        db_close($db);
        send_reject('No pages exist');
        return;
    }

    // need some settings info
    $sites = db_select($db, 'sites', ['owner', 'logo'], db_where($db, 'id', 1));
    if (!$sites) {
        // No idea to continue without settings!!!!
        db_close($db);
        send_reject('Failed to load sites');
        return;
    }
    $site = $srecs[0];

    // which image to use as logo
    // either the user picture is a user is logged in
    // the company logo if not
    $logo = '';
    $logoResque = 'icons/icewall-512x512.png'; // if everything else fails
    if ($args->username && !empty($args->username)) {
        $users = db_select($db, 'users', ['picture'], db_where($db, 'username', $args->username));
        if ($users !== false) {
            $user = $users[0];
            $logoSrc = 'sites/' . $args->key . '/images' . '/' . $user['picture'];
            if (!file_exists(__DIR__ . '/../../public/' . $logoSrc)) {
                $logoSrc = $logoResque;
            }
            $logo = '<a href="#" onclick="on_user_logout()">
                        <img id="navbar-logo" style="width:32px;height:auto" src="' . $logoSrc . '" alt="' . $user['username'] . '">
                    </a>';
        }
    } else {
        $logoSrc = 'sites/' . $args->key . '/images' . '/' . $site['logo'];
        if (!file_exists(__DIR__ . '/../../../public/' . $logoSrc)) {
            $logoSrc = $logoResque;
        }
        $logo = '<a href="#" onclick="on_user_login()">
        <img  id="navbar-logo" style="width:32px;height:auto" src="' . $logoSrc . '" alt="">
        </a>';
    }

    // Grab all pages to show in navbar
    $pagesAtTop = array();
    for ($i = 0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if ($page['isParent'] === '1' || $page['parentId'] === '0') {
            array_push($pagesAtTop, $page);
        }
    }

    $html =
        '       <div id="toggle-icon" class="toggle-icon" onclick="on_toggle_burger()">
               <i><img id="nav-burger" class="nav-burger" src=/icons/white/menu.svg></i>
               <i><img id="nav-close" class="nav-burger" style="display:none" src=/icons/white/close.svg></i>
           </div>
           <div class="logo">' . $logo . '</div>
           <div id="menu" class="menu">
               <div class="links">
                   <ul id="navbar-top-links">';

    foreach ($pagesAtTop as $page) {
        if ($page['isParent'] === '0') {
            $html .= '<li><a href="#" onclick="on_page_selected(' . $page['id'] . ')">' . $page['title'] . '</a></li>';
        } else {

            $html .= '<li class="parent" onclick="on_page_parent_selected(this)"><a href="#">' . $page['title'] . '</a>
                    <ul id="navbar-child-links" class="childs">';

            $childs = db_select($db, 'pages', ['*'], db_where($db, 'parentId', $page['id']));
            if ($childs !== false) {
                for ($j = 0; $j < count($childs); $j++) {
                    $child = $childs[$j];
                    if ($args->username || $child['isPublic'] === '1') {
                        $html .= '<li><a href="#"  onclick="on_page_selected(' . $child['id'] . ')">' . $child['title'] . '</a></li>';
                    }
                }
            }
            $html .= '</ul></li>';
        }
    }

    // Add the theme selector
    $html .= '<li class="parent" onclick="on_page_parent_selected(this)"><a href="#">Teman</a>
    <ul class="childs">';

    $themesnames = db_select($db, 'themes', ['name'], null, db_order_by('name', 'asc'));
    foreach($themesnames as $themename ) {
        $tname = $themename['name'];
        $html .= '<li><a href="#"  onclick="on_theme_selected(\'' . $tname . '\')">' . $tname . '</a></li>';
    }
    $html .= '</ul></li>';

    // and we are done!
    $html .=
        '</ul></div>
    </div>';

    send_resolve(compress_html($html));

}
