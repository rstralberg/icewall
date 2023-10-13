<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../../html/load.php';

function onEditPages(stdClass|null $args) : Reply {

    $mysqli = dbConnect();

    $pages = selectPages($mysqli);

    $all = '';
    foreach ($pages as $page) {
        $all .= '<option value="' . $page['id'] . '">' . $page['title'] . '</option>';
    }

    $parents = '';
    foreach ($pages as $page) {
        if( $page['isParent'] === '1' ) {
            $parents .= '<option value="' . $page['id'] . '">' . $page['title'] . '</option>';
        }
    }

    return load_requested_page('edit_pages', [
        'pages' => $all,
        'parents' => $parents
    ]);
}
?>
