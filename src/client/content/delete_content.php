<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['id'])) {

    $db = db_open($args->key);

    $contents = db_select($db, 'contents', ['pageId'], db_where($db, 'id', $args->id));
    if( $contents === false ) {
        db_close($db);
        send_reject('Cant find requested content');
        exit(0);
    } 
    if( gettype($contents) === 'string ')  {
        db_close($db);
        send_reject($copntents);
        exit(0);
    }
    $pageId = $content['pageId'];

    $deleted = db_delete($db, 'contents', db_where($db, 'id', $args->id));
    db_close($db);

    if( $deleted === false ) {
        send_reject('Failed to delete content');
        exit(0);
    } 
    if( gettype($deleted) === 'string ') {
        send_reject($deleted);
        exit(0);
    }
    
    $content = $contents[0];
    $contentfolder = 'sites/' . $args->key . '/' . $pageId . '/' . $args->id;

    array_map('unlink', glob($contentfolder.'/*.*'));
    rmdir($contentfolder);
    send_resolve(true);
}
