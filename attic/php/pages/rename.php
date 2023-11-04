<?php

require_once __DIR__ . '/../tools/reply.php';
require_once __DIR__ . '/../tools/loadForm.php';
require_once __DIR__ . '/page.php';

function renamePage(stdClass $args) : Reply {

    $db = new db(); 
    $db->open($args->database);
    
    $pages = selectPage($db, $args->pageId);
    $db->close();
    $page = $pages[0];

    return loadForm('page/html/rename', [
        'pageId' => $args->pageId,
        'old' => $page['title']
    ]);
}
?>