<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../tools/loadForm.php';


function saveNewPage(stdClass $args)
{
    $argErr = argError('saveNewPage', $args, [
        'title' => $args->title,
        'parentId' => $args->parentId,
        'isParent'=> $args->isParent,
        'author' => $args->author,
        'showTitle' => $args->showTitle,
        'pos' => $args->pos,
        'public' => $args->public]
    );
    if( $argErr ) return $argErr;

    $db = new db();
    $db->open($args->database);

    $id = $db->insert('page', [
        'title',
        'parentId',
        'isParent',
        'author',
        'showTitle',
        'pos',
        'public'
    ], [
        $db->string($args->title),
        $args->parentId,
        $db->bool($args->isParent),
        $db->string($args->author),
        $db->bool($args->showTitle),
        $args->pos,
        $db->bool($args->public)
    ]);
    if( gettype($id) == 'string') {
        return new Reply(false, '#' . $id);
    }
    $lastError = $db->lastError();
    $db->close();

    if ($id > 0)
        return new Reply(true, $id);
    else
        return new Reply(false, '#' . $lastError);
}


?>