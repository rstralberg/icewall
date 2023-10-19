<?php

require_once __DIR__ . '/../content/content.php';

function addContent(stdClass $args) : Reply {

    $db = new Db($args->database);
    $db->open();

    $id = insertContent($db, [
        $args->pageId,
        $db->string(rawurldecode('Här är ett nytt avsnitt')),
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
