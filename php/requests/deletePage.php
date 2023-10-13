<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../../html/load.php';

function onDeletePage(stdClass  $args) : Reply {

    $options = '';
    
    $mysqli = dbConnect();
    $pages = selectPages($mysqli);
    dbDisonnect($mysqli);

    for( $i=0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if( $args->isAdmin || $page['author'] === $args->username ) {
            if( $page['isParent']==='1' )
                $options .= '<option value="'.$page['id'].'">'.strtoupper($page['title']).'</option>';
            else
                $options .= '<option value="'.$page['id'].'">'.$page['title'].'</option>';
        }
    }

    return load_requested_page('delete_page', [
        'pages' => $options
    ]);
}
?>