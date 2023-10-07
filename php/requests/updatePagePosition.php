<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../storage/blocks.php';

function onUpdatePagePosition(stdClass $args) {

    $mysqli = dbConnect();
    updatePagePos($mysqli, json_decode($args->pages));
    dbDisonnect($mysqli);
    return new Reply('ok', true);
}

?>
