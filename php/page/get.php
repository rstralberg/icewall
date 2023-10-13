<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/pagetheme.php';

function getPage(stdClass $args) : Reply {

    $mysqli = dbConnect();
    $pages = selectPage($mysqli, $args->pageId);
    dbDisonnect($mysqli);
    return  $pages ? 
        new Reply( 'ok', json_encode($pages[0])): 
        new Reply('error', 'Sidan kunde inte laddas');
}


function getPageGroup(stdClass $args) : Reply {

    $mysqli = dbConnect();
    $pages = selectPage($mysqli, $args->pageId);
    if( $pages ) {
        $page = $pages[0];
        if( $page['parentId'] === '0' || $page['isParent'] === '1') {
            $pages = selectPageGroup($mysqli, sqlName('parentId').'=0 OR '. sqlName('isParent') . '=1');
            dbDisonnect($mysqli);
            return new Reply('ok', json_encode($pages));
        }
        else {
            $pages = selectPageGroup($mysqli, sqlName('parentId').'='. $page['parentId']);
            dbDisonnect($mysqli);
            return new Reply('ok', json_encode($pages));
        }
    }
    dbDisonnect($mysqli);
    return new Reply('error', 'Sidor kunde inte laddas');
}

?>