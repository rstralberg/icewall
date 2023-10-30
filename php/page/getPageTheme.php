<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../tools/reply.php';

function getPageTheme(stdClass $args): Reply
{

    $argErr = argError('getPageTheme', $args, [
        'pageId' => $args->pageId
    ]);
    if ($argErr)
        return $argErr;

    $db = new db();
    $db->open($args->database);

    $pages = $db->select(
        'page',
        [
            'wContent',
            'dCenter',
            'rRoundness',
            'shadows',
            'imgShadows',
            'borderColor',
            'borderWidth',
            'bgCenter',
            'bgCenterActive',
            'fgCenter',
            'fzCenter' 
        ],
        $db->name('id') . '=' . $args->pageId
    );
    $lastError = $db->lastError();
    $db->close();
    
    if( !$pages ) {
        return new Reply(false, '#' . $lastError);
    }
    $theme = $pages[0];
    return new Reply(true, json_encode($theme));
}

?>