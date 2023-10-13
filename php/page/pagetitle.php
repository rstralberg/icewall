<?php

require_once __DIR__ . '/../user/user.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/page.php';

function getPageTitle(stdClass|null $args): Reply
{
    if( $args === null ) return new Reply('error', 'Argument saknas vid hämtning av titel');

    $mysqli = dbConnect();

    $settings = selectSettings($mysqli);

    $user = [
            'id' => 0,
            'username' => '',
            'fullname' => '',
            'email' => '',
            'picture' => $settings[0]['logo'],
            'password' => '',
            'permPage' => '0',
            'permContent' => '0',
            'permUser' => '0',
            'permTheme' => '0',
            'permSettings' => '0'
    ];

    if ($args->username) {
        $users = selectUser($mysqli, $args->username);
        if ($users) {
            $user = $users[0];
        }
    }

    $pages = selectPage($mysqli, $args->pageId);
    dbDisonnect($mysqli);
    if (!$pages) {
        return new Reply('error', 'Kunde inte ladda sökta sida ' . $args->pageId);
    }

    $page = $pages[0];
    $args = [
        'show' => $page['showTitle'] === '1' || strlen($user['username'])>0 ? 'content' : 'none',
        'author' => $page['author'],
        'title' => $page['title']
    ];

    return loadForm('page/html/title', $args );
}

function hidePageTitle(stdClass $args) : Reply {

    $mysqli = dbConnect();
    $pages = selectPage($mysqli, $args->pageId);
    if( $pages ) {
        updateShowPageTitle($mysqli, $args->pageId, false );
        dbDisonnect($mysqli);
        return new Reply('ok', true);
    }
    else {
        dbDisonnect($mysqli);
        return new Reply('error', false);
    }
}

function showPageTitle(stdClass $args) : Reply {

    $mysqli = dbConnect();
    $pages = selectPage($mysqli, $args->pageId);
    if( $pages ) {
        updateShowPageTitle($mysqli, $args->pageId, true);
        dbDisonnect($mysqli);
        return new Reply('ok', true);
    }
    else {
        dbDisonnect($mysqli);
        return new Reply('error', false);
    }
}

?>