<?php

require_once __DIR__ . '/../content/content.php';

function addContent(stdClass $args) : Reply {

    $mysqli = dbConnect();

    $content_id = insertContent($mysqli, [
        $args->pageId,
        sqlString( $mysqli, 'text-algin:center'),
        sqlString( $mysqli, rawurldecode('Här är ett nytt avsnitt')),
        $args->pos,
        sqlBoolean(false)
    ]);

    dbDisonnect($mysqli);

    return new Reply($content_id>0?'ok':'error', $content_id);
}

?>
