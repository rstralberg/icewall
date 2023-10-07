<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/users.php';
require_once __DIR__ . '/../../html/load.php';

function onEditUsers(stdClass|null $args) : Reply {

    $mysqli = dbConnect();
    $users = selectUsers($mysqli);
    dbDisonnect($mysqli);

    $options = '';
    for($i=0; $i<count($users); $i++) {
        $options .= '<option value="'. $users[$i]['username'].'">'.$users[$i]['username'].'</option>';
    }

    return load_requested_page('edit_users', [
        'users' => $options,
        'size' => $args->size
    ]);
}
?>
