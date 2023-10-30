<?php

require_once __DIR__ . '/../content/content.php';

function addContent(stdClass $args) : Reply {

    $db = new db();
    $db->open($args->database);

    $id = insertContent($db, [
        $args->pageId,
        rawurldecode('Här är ett nytt avsnitt'),
        $args->pos,
        $db->bool(false)
    ]);
    $lastErrror = $db->lastError();
    $db->close();
    if( $id > 0 ) 
        return new Reply( true, $id);
    else 
        return new Reply( false, $lastErrror );
}

?>
