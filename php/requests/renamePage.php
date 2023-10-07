<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../../html/load.php';

function onRenamePage(stdClass $args) : Reply {

    $mysqli = dbConnect();
    $pages = selectPage($mysqli, $args->pageId);
    dbDisonnect($mysqli);
    $page = $pages[0];

    return load_requested_page('rename_page', [
        'pageId' => $args->pageId,
        'old' => $page['title']
    ]);
}
?>