<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/../utils/load.php';

function editPages(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    $pages = selectPages($db);

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

    return loadForm('page/html/edit', [
        'pages' => $all,
        'parents' => $parents
    ]);
}
?>
