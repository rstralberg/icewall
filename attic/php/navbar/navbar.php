<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../tools/reply.php';

function refreshNavbar( stdClass $args) : void {
    if( verifyRequest($args) === false ) return ;
    if( verifyRequestArg($args, 'username') === false ) return;

    $db = new db($args->key);

    // need some settings info
    $srecs = $db->select('sites', [ 'owner', 'logo'], $db->name('id').'=1');
    if (!$srecs) {
        // No idea to continue without settings!!!!
        sendReply(false, 'Failed to load sites');
        return;
    }
    $site = $srecs[0];

    // which image to use as logo
    // either the user picture is a user is logged in
    // the company logo if not

    $logo = '';
    $logoResque = 'icons/icewall-512x512.png'; // if everything else fails 
    if( $args->username && !empty($args->username)) {
        $users = $db->select('user', ['picture'], $db->name('username').'='.$db->string($args->username));
        if( $users ) {
            $user = $users[0];
            $logoSrc = 'sites/' . $args->key . '/images' . '/' . $user['picture'];
            if( !file_exists(__DIR__ . '/../../public/' . $logoSrc) ) {
                $logoSrc = $logoResque;
            }
            $logo = '<a href="#" onclick="evLogout()">
                        <img style="width:32px;height:auto" src="' . $logoSrc . '" alt="'.$user['username'].'">
                    </a>';
            }
    }
    else {
        $logoSrc = 'sites/' . $args->key . '/images' . '/' . $site['logo'];
        if( !file_exists(__DIR__ . '/../../public/' . $logoSrc) ) {
            $logoSrc = $logoResque;
        }
        $logo = '<a href="#" onclick="webForm(\'login\')">
        <img style="width:32px;height:auto" src="' . $logoSrc . '" alt="">
        </a>';
    }

    // Grab all pages to show in navbar
    $pages = $db->select('pages', ['*'], null, $db->name('pos') . ' asc' );
    $pagesAtTop = array();
    for ($i = 0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if ($page['isParent'] === '1' || $page['parentId'] === '0') {
            array_push($pagesAtTop, $page);
        }
    }

    $html = 
    '       <div id="toggle-icon" class="toggle-icon" onclick="evToggleIcon(this)">
               <i><img id="nav-burger" class="nav-burger" src=/icons/white/menu.svg></i>
               <i><img id="nav-close" class="nav-burger" style="display:none" src=/icons/white/close.svg></i>
           </div>
           <div class="logo">'.$logo.'</div>
           <div id="menu" class="menu">
               <div class="links">
                   <ul>';

    foreach ($pagesAtTop as $page) {
        if ($page['isParent'] === '0') {
            $html .= '<li><a href="#" onclick="evPageSelected('.$page['id'].')">' . $page['title'] . '</a></li>';
        } 
        else {

            $html .= '<li class="parent" onclick="evParentSelected(this)"><a href="#">' . $page['title'] . '</a>
                    <ul class="childs">';

            $childs = selectChildPages($db, $page['id']);
            for ($j = 0; $j < count($childs); $j++) {
                $child = $childs[$j];
                if ($args->username || $child['public'] === '1') {
                    $html .= '<li><a href="#"  onclick="evPageSelected('.$page['id'].')">' . $child['title'] . '</a></li>';
                }
            }
            $html .= '</ul></li>';
        }
    }

    // Add the theme selector
    $html .= '<li class="parent" onclick="evParentSelected(this)"><a href="#">Teman</a>
    <ul class="childs">';

    $themesnames  = $db->select('themes', ['name'], null, $db->name('name').' asc');
    for ($j = 0; $j < count($themesnames); $j++) {
        $tname = $themesnames[$j]->name;
        $html .= '<li><a href="#"  onclick="evThemeSelected(\''.$tname.'\')">' . $tname['name'] . '</a></li>';
    }
    $html .= '</ul></li>';

    // and we are done!
    $html .= 
    '</ul></div>
    </div>';

    sendReply(true, compressHTML($html));

}
