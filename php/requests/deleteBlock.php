<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/blocks.php';

function onDeleteBlock(stdClass $args) : Reply {

    $mysqli = dbConnect();

    deleteBlock($mysqli, $args->blockId);

    dbDisonnect($mysqli);

    return new Reply('ok', true);
}
?>
