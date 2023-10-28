<?php

require_once __DIR__ . '/../../tools/html.php';
require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/../../db/content.php';

function add():string {
    return loadHTML(__DIR__. '/add.html');
}

function weblink(stdClass $args) : Reply {
    $argsErr = argError('weblink', $args, [
        'text' => $args->text,
        'cursorpos' => $args->cursorpos
    ]);
    if ($argsErr) return $argsErr;

    return loadForm(__DIR__ . '/weblink', [
        'text' => $args->text,
        'cursorpos' => $args->cursorPos
    ]);
}

function image(stdClass $args) : Reply {

    $argErr = argError('image' , $args, [
        'url' => $args->url,
        'size' => $args->size
    ]);
    if( $argErr ) return $argErr;

    return loadForm(__DIR__ . '/image', [ 
        'url' => $args->url,
        'size' => $args->size
    ]);
}

// function title(stdClass $args) :Reply {
// }

function audio(stdClass $args) : Reply {

    $argErr = argError('audio', $args, [
        'url' => $args->url,
        'comment' => $args->size
    ]);
    if( $argErr ) return $argErr;

    return loadForm(__DIR__ . '/audio', [ 
        'url' => $args->url,
        'comment' => $args->comment 
    ]);
}

function spotify(stdClass $args) : Reply {

    $argErr = argError('spotify', $args, [
        'url' => $args->url
    ]);
    if( $argErr ) return $argErr;

    return loadForm(__DIR__ . '/spotify', [ 
        'url' => $args->url
    ]);
}

function soundcloud(stdClass $args) : Reply {

    $argErr = argError('soundcloud', $args, [
        'url' => $args->url
    ]);
    if( $argErr ) return $argErr;


    return loadForm(__DIR__ . '/soundcloud', [ 
        'url' => $args->url
    ]);
}

function youtube(stdClass $args) : Reply {

    $argErr = argError('youtube', $args, [
        'url' => $args->url
    ]);
    if( $argErr ) return $argErr;

    return loadForm(__DIR__ . '/youtube', [ 
        'url' => $args->url
    ]);
}




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
