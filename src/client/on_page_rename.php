<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

     $db = db_open($args->key);
     $pages = db_select($db, 'pages', ['id','title'], db_where($db, 'id', $args->pageid));
     db_close($db);
     send_resolve( load_form(__DIR__.'/_page_rename', [
          'old' => $pages[0]['title'],
          'pageId'=> $args->pageid
     ]));
}

