<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/../content/content.php';

function pageUpdate(stdClass $args) 
{
    $db = new db(); 
    $db->open($args->database);
    
    switch( $args->what ) {
        case 'parentId': updatePageParent($db, $args->pageId, $args->newParent); break;
        case 'pos': updatePagePos($db, json_decode($args->positions)); break;
        case 'public': updatePagePublic($db, $args->pageId, $args->pub); break;
        case 'title': updatePageTitle($db, $args->pageId, $args->title); break;
    }
    $db->close();
    return new Reply(true, '');
}
?>
