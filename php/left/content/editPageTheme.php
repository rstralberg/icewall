<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../tools/loadForm.php';


function editPageTheme(stdClass $args) : Reply {

    $argErr = argError('editPageTheme', $args, [
        'pageId' => $args->pageId
    ]);
    if ($argErr) return $argErr;

    $db = new db(); 
    $db->open($args->database);

    $pages = $db->select('page', ['*'], $db->name('id').'='.$args->pageId);

    if( !$pages ) {
        $lastError = $db->lastError();
        $db->close();
        return new Reply(false,'#' .  $lastError);
    }
    
    $page = $pages[0];
    
    $db->close();


    return loadForm(__DIR__ . '/edit_theme', [
            'wContent' => $page['wContent'],
            'rRoundness' => $page['rRoundness'],
            'borderColor' => $page['borderColor'],
            'borderWidth' => $page['borderWidth'],
            'shadows' => $page['shadows'],
            'bgCenter' => $page['bgCenter'],
            'fgCenter' => $page['fgCenter'],
            'fzCenter' => $page['fzCenter'],
            'dCenter' => $page['dCenter']
    ]);
            
    
}
?>
