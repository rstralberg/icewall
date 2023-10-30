<?php

require_once __DIR__ . '/page.php';

function getPage(stdClass $args) : Reply {

    $db = new db(); 
    $db->open($args->database);

    $pages = selectPage($db, $args->pageId);
    $db->close();

    if( $pages )
        return new Reply(true, json_encode($pages[0]));
    else 
        return new Reply(false, 'Sidan hittades inte');
}


function getPageGroup(stdClass $args) : Reply {

    $db = new db(); 
    $db->open($args->database);
    
    $pages = selectPage($db, $args->pageId);
    if( $pages ) {
        $page = $pages[0];
        if( $page['parentId'] === '0' || $page['isParent'] === '1') {
            $pages = selectPageGroup($db, $db->name('parentId').'=0 OR '. $db->name('isParent') . '=1');
            $db->close();
            return new Reply( true, json_encode($pages));
        }
        else {
            $pages = selectPageGroup($db, $db->name('parentId').'='. $page['parentId']);
            $db->close();
            return new Reply(true, json_encode($pages));
        }
    }
    $db->close();
    return new Reply(false, '');
}

?>