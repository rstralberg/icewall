<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/page.php';

function renamePage(stdClass $args) : Reply {

    $mysqli = dbConnect();
    $pages = selectPage($mysqli, $args->pageId);
    dbDisonnect($mysqli);
    $page = $pages[0];

    return loadForm('page/html/rename', [
        'pageId' => $args->pageId,
        'old' => $page['title']
    ]);
}
?>