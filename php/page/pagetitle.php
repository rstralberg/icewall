<?php

require_once __DIR__ . '/../user/user.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/page.php';

function getPageTitle(stdClass $args): Reply
{
    if( $args === null ) return new Reply(false, 'Tom begäran');

    $db = new Db($args->database); 
    $db->open();

    $pages = selectPage($db, $args->pageId);
    $db->close();
    if (!$pages) {
        return new Reply(false, 'Hittade inte sidan');
    }

    $page = $pages[0];
    $args = [
        'show' => $page['showTitle'] === '1' || strlen($args->username)>0 ? 'content' : 'none',
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
        return new Reply(true, '');
    }
    else {
        $db->close();
        return new Reply(false, 'Hittade inte sidan');
    }
}

function showPageTitle(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();
    $pages = selectPage($db, $args->pageId);
    if( $pages ) {
        updateShowPageTitle($db, $args->pageId, true);
        $db->close();
        return new Reply(true, '');
    }
    else {
        $db->close();
        return new Reply(false, 'Hittade inte sidan');
    }
}

?>