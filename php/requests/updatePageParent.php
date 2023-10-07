<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../storage/blocks.php';

function onUpdatePageParent(stdClass $args) {

    $mysqli = dbConnect();
    updatePageParent($mysqli, $args->pageId, $args->newParent);
    dbDisonnect($mysqli);
    return new Reply('ok', true);
}

?>
