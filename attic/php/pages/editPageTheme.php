<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/../tools/loadForm.php';

function editPageTheme(stdClass $args) : Reply {

    $db = new db(); 
    $db->open($args->database);

    $pages = selectPage($db, $args->pageId);
    if( !$pages ) {
        $lastError = $db->lastError();
        $db->close();
        return new Reply(false, $lastError);
    }
    
    $page = $pages[0];
    
    $db->close();


    return loadForm('page/html/edit_theme', [
            'wContent' => $page['wContent'],
            'rContent' => $page['rContent'],
            'bdColContent' => $page['bdColContent'],
            'bdSizeContent' => $page['bdSizeContent'],
            'shContent' => $page['shContent'],
            'bgContent' => $page['bgContent'],
            'fgContent' => $page['fgContent'],
            'fzContent' => $page['fzContent'],
            'dContent' => $page['dContent']
    ]);
            
    
}
?>
