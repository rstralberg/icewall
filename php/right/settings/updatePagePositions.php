<?php

require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/../../db/db.php';

function updatePagePositions(stdClass $args): Reply
{
    $argErr = argError('updatePagePositions', $args,[
        'pageId' => $args->pageId,
        'positions' => $args->positions
    ]);
    if( $argErr ) return $argErr;

    $db = new db();
    $db->open($args->database);

    $positions = json_decode($args->positions, true);
    for( $i = 0; $i < count($positions); $i++ ) {
        $pos = $positions[$i];
        if( !$db->update('page', ['pos'], [$pos['pos']], $db->name('id').'='.$pos['pageId']) ) {
            $lastErorr = $db->lastError();
            $db->close();
            return new Reply(false, '#' . $lastErorr);
        }
    }
    $db->close();
    return new Reply(true,'');
}


?>