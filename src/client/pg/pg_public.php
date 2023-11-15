<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

     $db = db_open($args->key);
     $pages = db_select($db, 'pages', ['isPublic'], db_where($db, 'id', $args->pageid));
     if( $pages === false ) {
          send_reject('Failed to load page info');
     } 
     else if ( gettype($pages) === 'string' ) {
          send_reject($pages);
     }

     $isPublic = $pages[0]['isPublic']==='0';
     $res = db_update($db, 'pages', ['isPublic'], [$isPublic], db_where($db, 'id', $args->pageid));
     db_close($db);

     if( $res === false ) {
          send_reject('Failed to update page');
     }
     else if( gettype($res) === 'string') {
          send_reject($res);
     }
     else {
          send_resolve($isPublic);
     }
}

