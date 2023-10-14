<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/page.php';

function renamePage(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();
    
    $pages = selectPage($db, $args->pageId);
    $db->close();
    $page = $pages[0];

    return loadForm('page/html/rename', [
        'pageId' => $args->pageId,
        'old' => $page['title']
    ]);
}
?>