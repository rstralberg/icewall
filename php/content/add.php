<?php

require_once __DIR__ . '/../content/content.php';

function addContent(stdClass $args) : Reply {

    $db = new Db($args->database);
    $db->open();

    $content_id = insertContent($db, [
        $args->pageId,
        $db->string('text-algin:center'),
        $db->string(rawurldecode('Här är ett nytt avsnitt')),
        $args->pos,
        $db->bool(false)
    ]);

    $db->close();

    return new Reply($content_id>0?'ok':'error', $content_id);
}

?>
