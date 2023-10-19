<?php

require_once __DIR__ . '/../content/content.php';

function saveContent( stdClass $args ) : Reply {

    $db = new Db($args->database); 
    $db->open();
    
    $content = null;
    $contents = selectContent($db, $args->id);
    if( $contents ) {
        $content = $contents[0];
        $content['html'] = $db->string($args->html);
        $content['public'] = $db->bool($args->pub);

        if( !updateContent($db, ['html','public','pos'], [
            $db->string($args->html),
            $db->bool($args->pub),
            $args->pos],
            $args->id) ) {
            $lastError = $db->lastError();
            $db->close();
            return new Reply(false, $lastError);
        }
    }
    else {
        $content['pageId'] = $args->pageId;
        $content['html'] = $db->string($args->html);
        $content['pos'] = $args->pos;
        $content['public'] = $db->bool($args->pub);
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