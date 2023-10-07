<?php

require_once __DIR__ . '/../storage/pages.php';

function onHidePageTitle(stdClass $args) : Reply {

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
?>