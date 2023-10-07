<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../storage/blocks.php';
require_once __DIR__ . '/../../html/load.php';

function onRemovePage(stdClass $args) : Reply {

    $mysqli = dbConnect();

    deletePage($mysqli, $args->pageId);
    $files = glob('uploads/p' . $args->pageId . '/*'); 
    foreach($files as $file) { 
        if(is_file($file)) {
            unlink($file); 
        }
    }
    deletePageBlocks($mysqli, $args->pageId);

    $firstId = getFirstPageId($mysqli);

    dbDisonnect($mysqli);
    
    return new Reply('ok', $firstId );
}
?>