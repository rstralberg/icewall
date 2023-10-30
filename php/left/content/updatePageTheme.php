<?php

require_once __DIR__ . '/../../db/db.php';


function updatePageTheme(stdClass $args): Reply
{

    $argErr = argError('updatePageTheme', $args, [
        'pageId' => $args->pageId,
        'wContent' => $args->wContent,
        'rRoundness' => $args->rRoundness,
        'borderColor' => $args->borderColor,
        'borderWidth' => $args->borderWidth,
        'shadows' => $args->shadows,
        'bgCenter' => $args->bgCenter,
        'fgCenter' => $args->fgCenter,
        'fzCenter' => $args->fzCenter,
        'dCenter' => $args->dCenter
    ]);
    if ($argErr)
        return $argErr;

    $db = new db();
    $db->open($args->database);

    $res = $db->update(
        'page',
        [
            'wContent',
            'rRoundness',
            'borderColor',
            'borderWidth',
            'shadows',
            'bgCenter',
            'fgCenter',
            'fzCenter',
            'dCenter'
        ],
        [
            $args->wContent,
            $args->rRoundness,
            $db->string($args->borderColor),
            $args->borderWidth,
            $args->shadows,
            $db->string($args->bgCenter),
            $db->string($args->fgCenter),
            $args->fzCenter,
            $args->dCenter
        ],
        $db->name('id') . '=' . $args->pageId
    );
    $lastError = $db->lastError();
    ;
    $db->close();

    if ($res)
        return new Reply(true, '');
    else
        return new Reply(false, '#' . $lastError);
}

?>