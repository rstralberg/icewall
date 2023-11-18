<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['title','author','isParent','parentId','pos','showtitle'])) {

    $db = db_open($args->key);

    $sites = db_select($db, 'sites', ['title'], db_where($db, 'key',$args->key));

    $res = db_insert($db, 'pages', ['title','author','isParent','parentId','pos','showTitle', 'isPublic'],
        [$args->title, $args->author, $args->isParent, $args->parentId, $args->pos, $args->showtitle, false]);
    
    if ($res === false) {
        db_close($db);
        send_reject('Failed to create page');
    } 
    else if ( gettype($res)==='string' ) {
        db_close($db);
        send_reject($res);
    }
    else {
        $pages = db_select($db, 'pages', ['*'], db_where($db, 'id', $res));
        $page = $pages[0];
        
        $id = db_insert($db, 'contents', 
            ['pageId', 'pos', 'html','style','isPublic'],
            [$res, 0, $sites[0]['title'] . ' ' . $args->title, '', true]);
        db_close($db);
        if( $id === false ) {
            send_reject( 'Kunde inte skapa innehåll till sidan');
            exit(0);
        }
        else if ( gettype($id) === 'string') {
            send_reject($id);
        }
        else {
            send_resolve($page);
        }
    }
}
