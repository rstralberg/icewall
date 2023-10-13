<?php

require_once __DIR__ . '/../content/content.php';

function saveContent( stdClass $args ) : Reply {

    $mysqli = dbConnect();
    
    $content = null;
    $contents = selectContent($mysqli, $args->id);
    if( $contents ) {
        $content = $contents[0];
        $content['style'] = sqlString($mysqli,$args->style);
        $content['html'] = sqlString($mysqli,$args->html);
        $content['public'] = sqlBoolean($args->pub);

        if( !updateContent($mysqli, ['style','html','public','pos'], [
            sqlString($mysqli, $args->style),
            sqlString($mysqli,$args->html),
            sqlBoolean($args->pub),
            $args->pos],
            $args->id) ) {
            dbDisonnect($mysqli);
            return new Reply( 'error', '### Kunde inte spara avsnittet: ' .  mysqli_error($mysqli) );
        }
    }
    else {
        $content['pageId'] = $args->pageId;
        $content['style'] = sqlString($mysqli,$args->style);
        $content['html'] = sqlString($mysqli,$args->html);
        $content['pos'] = $args->pos;
        $content['public'] = sqlBoolean($args->pub);
        $content['id'] = insertContent($mysqli, $content);
        if( $content['id'] < 1 ) {
            dbDisonnect($mysqli);
            return new Reply( 'error', '### Kunde inte spara avsnittet: ' .  mysqli_error($mysqli) );
        }
    }   

    dbDisonnect($mysqli);
    return new Reply('ok', generateContent($content));

}
?>