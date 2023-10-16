<?php

require_once __DIR__ . '/../user/user.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/page.php';

function getPageTitle(stdClass|null $args): Reply
{
    if( $args === null ) return new Reply('error', 'Argument saknas vid hämtning av titel');

    $db = new Db($args->database); 
    $db->open();

    $settings = selectSettings($db);

    $user = [
            'id' => 0,
            'username' => '',
            'fullname' => '',
            'email' => '',
            'picture' => $settings[0]['logo'],
            'password' => '',
            'isAdmin' => '0'
    ];

    if ($args->username) {
        $users = selectUser($db, $args->username);
        if ($users) {
            $user = $users[0];
        }
    }

    $pages = selectPage($db, $args->pageId);
    $db->close();
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

    $db = new Db($args->database); 
    $db->open();
    $pages = selectPage($db, $args->pageId);
    if( $pages ) {
        updateShowPageTitle($db, $args->pageId, false );
        $db->close();
        return new Reply('ok', true);
    }
    else {
        $db->close();
        return new Reply('error', false);
    }
}

function showPageTitle(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();
    $pages = selectPage($db, $args->pageId);
    if( $pages ) {
        updateShowPageTitle($db, $args->pageId, true);
        $db->close();
        return new Reply('ok', true);
    }
    else {
        $db->close();
        return new Reply('error', false);
    }
}

?>