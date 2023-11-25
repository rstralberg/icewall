<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['title', 'author', 'isParent', 'parentId', 'pos', 'showtitle'])) {

    $db = db_open($args->key);

    $sites = db_select($db, 'sites', ['title'], db_where($db, 'key', $args->key));

    $pageid = db_insert($db, 'pages', ['title', 'author', 'isParent', 'parentId', 'pos', 'showTitle', 'isPublic'],
        [$args->title, $args->author, $args->isParent, $args->parentId, $args->pos, $args->showtitle, false]);

    if ($pageid === false) {
        db_close($db);
        send_reject('Failed to create page');
        exit(0);
    }

    if (gettype($pageid) === 'string') {
        db_close($db);
        send_reject($pageid);
        exit(0);
    }

    $themes = db_select($db, 'themes', ['*'], db_where($db, 'name', $sites[0]['theme']));
    if( $themes !== false && gettype($themes) !== 'string' ) {
        $theme = $themes[0];
        db_update($db, 'pages', [
            'contentW','contentD','contBg','contFg','contBorder','contShadow',
            'markBg','markFg','markBorder','markShadow','markFsize','markBold','markItalic'], [
            $theme['contentW'],$theme['contentD'],$theme['contBg'],$theme['contFg'],
            $theme['contBorder'],$theme['contShadow'], $theme['markBg'],$theme['markFg'],
            $theme['markBorder'],$theme['markShadow'],$theme['markFsize'],
            $theme['markBold'],$theme['markItalic']],            
            db_where($db, 'id', $pageid));
    }

    $id = db_insert($db, 'contents',
        ['pageId', 'pos', 'html', 'style', 'isPublic'],
        [$pageid, 0, '<article type="title"><h1>' . $sites[0]['title'] . ' ' . $args->title . '</h1></article>', '', true]);
    if ($id === false) {
        db_close($db);
        send_reject('Kunde inte skapa innehåll till sidan');
        exit(0);
    } 
    if (gettype($id) === 'string') {
        db_close($db);
        send_reject($id);
        exit(0);
    }
    
    $pages = db_select($db, 'pages', ['*'], db_where($db, 'id', $pageid));
    if ($pages === false) {
        db_close($db);
        send_reject('Kunde inte skapa sidan');
        exit(0);
    } 
    if (gettype($pages) === 'string') {
        db_close($db);
        send_reject($pages);
        exit(0);
    }
    
    $page = $pages[0];
    send_resolve(json_encode($page));
}
