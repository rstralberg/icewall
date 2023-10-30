<?php

require_once __DIR__ . '/../db/db.php';

function generateNavbar(SrvReq $req): Reply
{
    if( !$req->verifyArgs(['username']) ) {
        return new Reply(false, 'generateNavbar: "username" is missing');
    }

    $dbName = $req->args->key;
    $username =  $req->args->username;
    
    $db = new db(); 
    $db->open($dbName);

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

    // Grab all pages to show in navbar
    $pages = selectPages($db);
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
                if ($username || $child['public'] === '1') {
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
        $tname = $themesnames[$j];
        $html .= '<li><a href="#"  onclick="evThemeSelected(\''.$tname.'\')">' . $tname['name'] . '</a></li>';
    }
    $html .= '</ul></li>';

    // and we are done!
    $html .= 
    '</ul></div>
    </div>';

    return new Reply(true, compressHTML($html));
}

