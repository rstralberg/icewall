<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/../utils/load.php';

function createNewPage(stdClass $args) : Reply {

    
    $db = new Db($args->database); 
    $db->open();
    $pages = selectPages($db);
    $users = selectUsers($db);
    $db->close();

    $parents = '';
    for( $i=0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if( $page['isParent']==='1' ) {
            $parents .= 
                '<option value="' . $page['id'] . '">Under sidan \'' . $page['title'] . '\'</option>';
        }
    }
    
    $usernames = '';
    for( $i=0; $i < count($users); $i++) {
        $user = $users[$i];
        $usernames .= 
                '<option value="' . $user['username'] . '">' . $user['fullname'] . '</option>';
    }

    return loadForm('page/html/create', [
        'pages' => $parents,
        'users' => $usernames
    ]);
}

function saveNewPage(stdClass $args) {

    $db = new Db($args->database); 
    $db->open();

    $page =  [
        $db->string( $args->title),
        $args->parentId,
        $db->bool($args->isParent),
        $db->string( $args->author),
        $db->bool($args->showTitle),
        $args->pos,
        $db->bool($args->public),
        $db->string( $args->style) 
    ];

    $page['id'] = insertPage($db, $page );
    
    $db->close();

    return new Reply(((int)$page['id'])>0?'ok':'error', json_encode($page) );
}


?>