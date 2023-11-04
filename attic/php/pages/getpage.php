<?php

require_once __DIR__ . '/../tools/reply.php';
require_once __DIR__ . '/../db/db.php';

function getpage(stdClass $args) : void {

    if( verifyRequest($args) === false ) return;
    if( verifyRequestArg( $args, 'pageId') === false ) return;

    $db = new db($args->key);

    $pages = $db->select('pages', ['*'], $db->where('id', $args->pageId));
    if( $pages ) {
        $page = $pages[0];
        sendReply(true, $page);
    }
    else  
        sendReply(false, 'Sidan hittades inte');
}

?>