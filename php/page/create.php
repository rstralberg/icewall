<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/../utils/load.php';

function createNewPage() : Reply {

    
    $mysqli = dbConnect();
    $pages = selectPages($mysqli);
    $users = selectUsers($mysqli);
    dbDisonnect($mysqli);

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

function saveNewPage($args) {

    $mysqli = dbConnect();

    $page =  [
        sqlString($mysqli, $args->title),
        $args->parentId,
        sqlBoolean($args->isParent),
        sqlString($mysqli, $args->author),
        sqlBoolean($args->showTitle),
        $args->pos,
        sqlBoolean($args->public),
        sqlString($mysqli, $args->style) 
    ];

    $page['id'] = insertPage($mysqli, $page );
    
    dbDisonnect($mysqli);

    return new Reply(((int)$page['id'])>0?'ok':'error', json_encode($page) );
}


?>