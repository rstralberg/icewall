<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/../content/content.php';

function pageUpdate(stdClass $args) 
{
    $db = new Db($args->database); 
    $db->open();
    
    switch( $args->type ) {
        case 'parentId': updatePageParent($db, $args->pageId, $args->newParent); break;
        case 'pos': updatePagePos($db, json_decode($args->positions)); break;
        case 'public': updatePagePublic($db, $args->pageId, $args->pub); break;
        case 'title': updatePageTitle($db, $args->pageId, $args->title); break;
    }
    $db->close();
    return new Reply('ok', true);
}
?>
