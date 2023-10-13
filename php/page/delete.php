<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/page.php';

function delPage(stdClass  $args) : Reply {

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

    return loadForm('page/html/delete', [
        'pages' => $options
    ]);
}

function removePage(stdClass $args) : Reply {

    $mysqli = dbConnect();

    deletePage($mysqli, $args->pageId);
    $files = glob('uploads/p' . $args->pageId . '/*'); 
    foreach($files as $file) { 
        if(is_file($file)) {
            unlink($file); 
        }
    }
    deletePageContents($mysqli, $args->pageId);

    $firstId = getFirstPageId($mysqli);

    dbDisonnect($mysqli);
    
    return new Reply('ok', $firstId );
}

?>