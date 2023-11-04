<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/../../tools/loadForm.php';

function editUsers(stdClass $args) : Reply {

    $argErr = argError('editUsers', $args, []);
    if( $argErr ) return $argErr;

    $db = new db();
    $db->open($args->database);

    $users = $db->select('user', ['username'], null, $db->name('username').' asc');
    $options = '';
    for($i=0; $i<count($users); $i++) {
        $user = $users[$i];
        $name = $user['username'];
        $options .= '<option value="'. $name.'">'.$name.'</option>';
    }

    return loadForm(__DIR__ . '/editUsers', [
        'users' => $options,
        'size' => 128
    ]);
}

?>
