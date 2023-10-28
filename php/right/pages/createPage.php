<?php

require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/../../tools/loadForm.php';
require_once __DIR__ . '/../../db/db.php';

function createPage(stdClass $args) : Reply {
    
    $argErr = argError('createPage', $args, []);
    if ($argErr) return $argErr;

    $db = new Db($args->database);
    $db->open();
    
    $pages = $db->select('page', ['id', 'title', 'isParent'], null, $db->name('pos').' asc');
    $users = $db->select('user', ['username', 'fullname'], null, $db->name('username') . ' asc');

    $db->close();

    $parents = '';
    for ($i = 0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if ($page['isParent'] === '1') {
            $parents .=
                '<option value="' . $page['id'] . '">Under sidan \'' . $page['title'] . '\'</option>';
        }
    }

    $usernames = '';
    for ($i = 0; $i < count($users); $i++) {
        $user = $users[$i];
        $usernames .=
            '<option value="' . $user['username'] . '">' . $user['fullname'] . '</option>';
    }

    return loadForm(__DIR__ . '/createPage', [
        'pages' => $parents,
        'users' => $usernames
    ]);
}
?>
