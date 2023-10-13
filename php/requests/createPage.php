<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../../html/load.php';

function onCreatePage() : Reply {

    
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

    return load_requested_page('create_page', [
        'pages' => $parents,
        'users' => $usernames
    ]);
}
?>