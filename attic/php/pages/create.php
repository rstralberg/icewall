<?php

require_once __DIR__ . '/page.php';
require_once __DIR__ . '/../tools/loadForm.php';

function createNewPage(stdClass $args): Reply
{


    $db = new db();
    $db->open($args->database);
    $pages = selectPages($db);

    $users = $db->select('user', ['username', 'fullname'], null, 'username asc');

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

    return loadForm('page/html/create', [
        'pages' => $parents,
        'users' => $usernames
    ]);
}

function saveNewPage(stdClass $args)
{

    $db = new db();
    $db->open($args->database);

    $id = $db->insert('page', [
        'title',
        'parentId',
        'isParent',
        'author',
        'showTitle',
        'pos',
        'public'
    ], [
        $db->string($args->title),
        $args->parentId,
        $db->bool($args->isParent),
        $db->string($args->author),
        $db->bool($args->showTitle),
        $args->pos,
        $db->bool($args->public)
    ]);
    $lastError = $db->lastError();
    $db->close();

    if ($id > 0)
        return new Reply(true, $id);
    else
        return new Reply(false, $lastError);
}


?>