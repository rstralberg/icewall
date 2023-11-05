<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

    $db = db_open($args->key);

    $pagefolder = 'sites/' . $args->key . '/' . $args->pageid;

    $contents = db_select($db, 'contents', ['id'], db_where($db, 'pageId', $args->pageid));
    if( $contents ) {
        foreach($contents as $content ) {
            $contentfolder = $pagefolder . '/' . $content['id'];
            array_map('unlink', glob($contentfolder.'/*.*'));
            rmdir($contentfolder);
        }
    }
    array_map('unlink', glob($pagefolder.'/*.*'));
    rmdir($pagefolder);

    if( db_delete($db, 'pages', db_where($db, 'id', $args->pageid )) === false ) {
        db_close($db);
        send_reject('Failed to delete page');
    } else {
        db_close($db);
        send_resolve('');
    }
}
