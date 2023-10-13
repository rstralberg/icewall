<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/../content/content.php';

function pageUpdate(stdClass $args) 
{
    $mysqli = dbConnect();
    switch( $args->type ) {
        case 'parentId': updatePageParent($mysqli, $args->pageId, $args->newParent); break;
        case 'pos': updatePagePos($mysqli, json_decode($args->positions)); break;
        case 'public': updatePagePublic($mysqli, $args->pageId, $args->pub); break;
        case 'title': updatePageTitle($mysqli, $args->pageId, $args->title); break;
    }
    dbDisonnect($mysqli);
    return new Reply('ok', true);
}
?>
