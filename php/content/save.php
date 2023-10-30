<?php

require_once __DIR__ . '/../content/content.php';

function saveContent( stdClass $args ) : Reply {

    $db = new db(); 
    $db->open($args->database);
    
    $content = null;
    $contents = selectContent($db, $args->id);
    if( $contents ) {
        $content = $contents[0];
        $content['html'] = $args->html;
        $content['public'] = $args->pub;

        if( !updateContent($db, ['html','public','pos'], [
            $args->html,
            $args->pub,
            $args->pos],
            $args->id) ) {
            $lastError = $db->lastError();
            $db->close();
            return new Reply(false, $lastError);
        }
    }
    else {
        $content['pageId'] = $args->pageId;
        $content['html'] = $args->html;
        $content['pos'] = $args->pos;
        $content['public'] = $args->pub;
        $content['id'] = insertContent($db, $content);
        if( $content['id'] < 1 ) {
            $lastError = $db->lastError();
            $db->close();
            return new Reply(false, $lastError);
        }
    }   

    $db->close();
    return new Reply(true, generateContent($content));

}
?>