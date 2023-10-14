<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/pagetheme.php';

function getPage(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    $pages = selectPage($db, $args->pageId);
    $db->close();
    return  $pages ? 
        new Reply( 'ok', json_encode($pages[0])): 
        new Reply('error', 'Sidan kunde inte laddas');
}


function getPageGroup(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();
    
    $pages = selectPage($db, $args->pageId);
    if( $pages ) {
        $page = $pages[0];
        if( $page['parentId'] === '0' || $page['isParent'] === '1') {
            $pages = selectPageGroup($db, $db->name('parentId').'=0 OR '. $db->name('isParent') . '=1');
            $db->close();
            return new Reply('ok', json_encode($pages));
        }
        else {
            $pages = selectPageGroup($db, $db->name('parentId').'='. $page['parentId']);
            $db->close();
            return new Reply('ok', json_encode($pages));
        }
    }
    $db->close();
    return new Reply('error', 'Sidor kunde inte laddas');
}

?>