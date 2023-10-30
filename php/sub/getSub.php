<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../tools/loadForm.php';


function getSub(stdClass $args): Reply
{
    $argErr = argError('getSub', $args, [
        'pageId' => $args->pageId,
        'username' => $args->username
    ]);
    if ($argErr) return $argErr;

    $db = new db(); 
    $db->open($args->database);

    $pages = $db->select('page', ['*'], $db->name('id').'='.$args->pageId);

    $db->close();
    if (!$pages) {
        return new Reply(false, 'Hittade inte sidan');
    }

    $page = $pages[0];
    $args = [
        'show' => $page['showTitle'] === '1' || strlen($args->username)>0 ? 'content' : 'none',
        'author' => $page['author'],
        'title' => $page['title']
    ];

    return loadForm(__DIR__ . '/sub', $args );
}



?>