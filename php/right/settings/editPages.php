<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/../../tools/loadForm.php';

function editPages(stdClass $args) : Reply {

    $db = new db(); 
    $db->open($args->database);

    $pages = $db->select('page', ['id', 'title', 'isParent'], null, $db->name('pos') . ' asc');

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

    return loadForm(__DIR__ . '/editpages', [
        'pages' => $all,
        'parents' => $parents
    ]);
}
?>
