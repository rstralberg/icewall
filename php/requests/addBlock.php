<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/blocks.php';

function onAddBlock(stdClass $args) : Reply {

    $mysqli = dbConnect();

    $block_id = insertBlock($mysqli, [
        $args->pageId,
        sqlString( $mysqli, 'text-algin:center'),
        sqlString( $mysqli, 'Här är ett nytt avsnitt'),
        $args->pos,
        sqlBoolean(false)
    ]);

    dbDisonnect($mysqli);

    return new Reply($block_id>0?'ok':'error', $block_id);
}

?>
