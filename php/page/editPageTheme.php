<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/pagetheme.php';
require_once __DIR__ . '/../utils/load.php';

function editPageTheme(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    $pages = selectPage($db, $args->pageId);
    if( !$pages ) {
        $db->close();
        return new Reply('error', $db->lastError());
    }
    
    $theme = null;
    $page = $pages[0];
    $style = $page['style'];
    
    $pagethemes = selectPageTheme($db, $style);

    if( $style === 'Standard' || !$pagethemes ) {
        $page['style'] = 'st-' . $args->pageId;
        updatePage($db, ['style'], [$db->string($page['style'])], $db->name('id') . '=' . $page['id']);

        $themes = selectPageTheme($db, 'Standard');
        if( $themes ) {
            $theme = $themes[0];
            $theme['name'] = $page['style'];
            insertPageTheme($db, [
                $db->string($theme['name']),
                $theme['wContent'],
                $theme['rContent'],
                $theme['shContent'],
                $db->string($theme['bdColContent']),
                $theme['bdSizeContent'],
                $db->string($theme['bgContent']),
                $db->string($theme['fgContent']),
                $theme['fzContent'],
                $theme['dContent'],
            ]);
        }
    } 
    else {
        $themes = selectPageTheme($db, $page['style']);
        if( $themes ) {
            $theme = $themes[0];
        }
    }

    if( $theme === null ) {
        $error = $db->lastError();
        $db->close();
        return new Reply('error', $error);
    }
    $db->close();


    return loadForm('page/html/edit_theme', [
            'wContent' => $theme['wContent'],
            'rContent' => $theme['rContent'],
            'bdColContent' => $theme['bdColContent'],
            'bdSizeContent' => $theme['bdSizeContent'],
            'shContent' => $theme['shContent'],
            'bgContent' => $theme['bgContent'],
            'fgContent' => $theme['fgContent'],
            'fzContent' => $theme['fzContent'],
            'dContent' => $theme['dContent']
    ]);
            
    
}
?>
