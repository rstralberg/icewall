<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

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

        $id = db_insert($db, 'contents', ['pageId', 'pos', 'html','isPublic'],
            [$res, 0, $sites[0]['title'] . ' ' . $args->title, false]);

        db_close($db);
        send_resolve($id);
    }
}
