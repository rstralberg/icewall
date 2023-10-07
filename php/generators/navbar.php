<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/db.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../storage/users.php';
require_once __DIR__ . '/../storage/settings.php';
require_once __DIR__ . '/../storage/themes.php';

function generate_navbar(string $theme, string|null $username): Reply
{

    $mysqli = dbConnect();

    $logo = '';
    $config = null;
    $configs = selectSettings($mysqli);
    if ($configs) {
        $config = $configs[0];
        $logo = '<a id="navbar-logo" class="navbar-logo" href="#" onclick="onLogin()">
                    <img class="navbar-logo" src="' . $config['logo'] . '">
                </a>';
    }

    $pages = selectPages($mysqli);
    $pagesAtTop = array();
    for ($i = 0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if ($page['isParent'] === '1' || $page['parentId'] === '0') {
            array_push($pagesAtTop, $page);
        }
    }

    $user = null;
    if ($username) {
        $users = selectUser($mysqli, $username);
        if ($users) {
            $user = $users[0];
        }
    }

    $html = '<div class="navbar" id="navbar-content">';

    if ($username) {
        $users = selectUser($mysqli, $username);
        if ($users) {
            $user = $users[0];
            $logo = '<a id="navbar-logo" class="navbar-logo" href="#" onclick="onLogout()">
                        <img class="navbar-logo" src="' . $user['picture'] . '">
                    </a>';
        }
    }
    $html .= $logo;


    foreach ($pagesAtTop as $page) {
        if ($username || $page['public'] === '1') {
            if ($page['isParent'] === '1') {
                $html .= '<div class="subnav">';
                $html .= '<button type="button" id="p-' . $page['id'] . '" class="subnavbtn">' . $page['title'] . '</button>';
                $html .= '<div class="subnav-content">';
                $childs = selectChildPages($mysqli, $page['id']);
                for ($j = 0; $j < count($childs); $j++) {
                    $child = $childs[$j];
                    if( $username || $child['public']==='1') {
                        $html .= '<a href="#" onclick="onPageSelect(' . $child['id'] . ')">' . $child['title'] . '</a>';
                    }
                }
                $html .= '</div>';
                $html .= '</div>';
            } else {
                $html .= '<a href="#" onclick="onPageSelect(' . $page['id'] . ')">' . $page['title'] . '</a>';
            }
        }
    }

    $html .= '<select class="navbar-theme" id="theme-select" onchange="onThemeSelect()">';
    $themenames = selectThemeNames($mysqli);
    foreach ($themenames as $themename) {
        $html .= '<option value"' . $themename['theme'] . '" ';
        if ($themename['theme'] === $theme)
            $html .= ' selected';
        $html .= '">' . $themename['theme'] . '</option>';
    }
    $html .= '</select>';

    dbDisonnect($mysqli);

    $html .= '<a class="navbar-icon" href="javascript:void(0)" onclick="navbarToggle(\'navbar\')">';
    $html .= '<img class="navbar-icon" height="28px" src="/icons/navbar.svg" alt="icons/navbar.svg">';
    $html .= '</a>';
    $html .= '</div>';

    return new Reply('ok', compressHTML($html));
}