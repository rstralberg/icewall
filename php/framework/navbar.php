<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../page/page.php';
require_once __DIR__ . '/../user/user.php';
require_once __DIR__ . '/../settings/settings.php';
require_once __DIR__ . '/../theme/theme.php';

function generate_navbar(stdClass $args, string $theme, string|null $username): Reply
{

    $db = new Db($args->database); $db->open();

    $logo = '';
    $config = null;
    $configs = selectSettings($db);
    if ($configs) {
        $config = $configs[0];
        $logo = '<a href="#" onclick="onLogin()">
        <img style="width:32px;height:auto" src="' . $config['logo'] . '" alt="Logga">
        </a>';
    }

    $pages = selectPages($db);
    $pagesAtTop = array();
    for ($i = 0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if ($page['isParent'] === '1' || $page['parentId'] === '0') {
            array_push($pagesAtTop, $page);
        }
    }

    $user = null;
    if ($username) {
        $users = selectUser($db, $username);
        if ($users) {
            $user = $users[0];
        }
    }

    if ($username) {
        $users = selectUser($db, $username);
        if ($users) {
            $user = $users[0];
            $logo = '<a href="#" onclick="onLogout()">
                        <img style="width:32px;height:auto" src="' . $user['picture'] . '" alt="Logga">
                    </a>';
        }
    }

    $themesnames  = selectThemeNames($db);

    $html = 
    '<nav>
        <div class="navcontainer">
           <div id="toggle-icon" class="toggle-icon" onclick="navbarToggleIconClicked(this)">
               <i><img id="nav-burger" class="nav-burger" src=/icons/white/menu.svg></i>
               <i><img id="nav-close" class="nav-burger" style="display:none" src=/icons/white/close.svg></i>
           </div>
           <div class="logo">'.$logo.'</div>
           <div id="menu" class="menu">
               <div class="links">
                   <ul>';

    foreach ($pagesAtTop as $page) {
        if ($page['isParent'] === '0') {
            $html .= '<li><a href="#" onclick="navbarPageSelected('.$page['id'].')">' . $page['title'] . '</a></li>';
        } 
        else {

            $html .= '<li class="parent" onclick="navbarParentClicked(this)"><a href="#">' . $page['title'] . '</a>
                    <ul class="childs">';

            $childs = selectChildPages($db, $page['id']);
            for ($j = 0; $j < count($childs); $j++) {
                $child = $childs[$j];
                if ($username || $child['public'] === '1') {
                    $html .= '<li><a href="#"  onclick="navbarPageSelected('.$page['id'].')">' . $child['title'] . '</a></li>';
                }
            }
            $html .= '</ul></li>';
        }
    }

    $html .= '<li class="parent" onclick="navbarParentClicked(this)"><a href="#">Teman</a>
    <ul class="childs">';

    for ($j = 0; $j < count($themesnames); $j++) {
        $tname = $themesnames[$j];
        $html .= '<li><a href="#"  onclick="navbarThemeSelected(\''.$tname.'\')">' . $tname['name'] . '</a></li>';
    }
    $html .= '</ul></li>';
    
    $html .= 
    '</ul></div>
    </div>
    </div>
    </nav>';

    return new Reply('ok', compressHTML($html));
}

function getNavbar( stdClass|null $args) : Reply {
    return generate_navbar($args, $args->theme, $args?$args->username:null);
}