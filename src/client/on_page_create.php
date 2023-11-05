<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['username'])) {

     $db = db_open($args->key);

     $pages = db_select($db, 'pages', ['id', 'title'], null, db_order_by('pos', 'asc'));
     $pageoptions = '';
     foreach($pages as $page) {
          $pageoptions .= '<option value="' . $page['id'] . '">'.$page['title'].'</option>';
     }

     $users = db_select($db, 'users', ['username', 'fullname'], null, db_order_by('username', 'asc'));
     $useroptions = '';
     foreach($users as $user) {
          $useroptions .= '<option value="' . $user['username'] . '">'.$user['fullname'].'</option>';
     }

     send_resolve( load_form(__DIR__.'/_page_create', [
          'pages' => $pageoptions,
          'users' => $useroptions
     ]));
}

