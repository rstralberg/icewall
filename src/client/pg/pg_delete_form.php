<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid'])) {

     $db = db_open($args->key);

     $pages = db_select($db, 'pages', ['id','title'], db_where($db, 'id', $args->pageid));
     $pageoptions = '<option value="' . $pages[0]['id'] . '">'.$pages[0]['title'].'</option>';
     $pages = db_select($db, 'pages', ['id','title'], db_where_not($db,'id',$args->pageid), db_order_by('title', 'asc'));
     foreach($pages as $page) {
          $pageoptions .= '<option value="' . $page['id'] . '">'.$page['title'].'</option>';
     }

     send_resolve( load_form(__DIR__.'/pg_delete_form', [
          'pages' => $pageoptions
     ]));
}

