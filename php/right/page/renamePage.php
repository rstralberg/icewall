<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../tools/reply.php';

function renamePage(stdClass $args): Reply
{

    $argErr = argError('renamePage', $args, [
        'pageId' => $args->pageId
    ]);
    if ($argErr)
        return $argErr;


    $db = new Db($args->database);
    $db->open();

    $pages = $db->select('page', ['title'], $db->name('id') . '=' . $args->pageId);
    $page = $pages[0];

    $db->close();

    return loadForm(__DIR__ . '/renamePage', [
        'pageId' => $args->pageId,
        'old' => $page['title']
    ]);
}


?>