<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../storage/blocks.php';

function onUpdatePageTitle(stdClass $args) {

    $mysqli = dbConnect();
    $pages = selectPage($mysqli, $args->pageId);
    if( $pages ) {
        updatePageTitle($mysqli, $args->pageId, $args->title);
        dbDisonnect($mysqli);
        return new Reply('ok', true);
    }
    else {
        dbDisonnect($mysqli);
        return new Reply('error', false);
    }
}

?>
