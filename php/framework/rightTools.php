<?php

require_once __DIR__ . '/../utils/load.php';

function rightTools(stdClass $args): Reply
{
    if ($args === null)
        return new Reply('error', 'Argument saknas vid hämtning av titel');

    $mysqli = dbConnect();

    $settings = selectSettings($mysqli);

    $user = [
        'id' => 0,
        'username' => '',
        'fullname' => '',
        'email' => '',
        'picture' => $settings[0]['logo'],
        'password' => '',
        'permPage' => '0',
        'permContent' => '0',
        'permUser' => '0',
        'permTheme' => '0',
        'permSettings' => '0'
    ];

    if ($args->username) {
        $users = selectUser($mysqli, $args->username);
        if ($users) {
            $user = $users[0];
        }
    }

    $pages = selectPage($mysqli, $args->pageId);
    dbDisonnect($mysqli);
    if (!$pages) {
        return new Reply('error', 'Kunde inte ladda sökta sida ' . $args->pageId);
    }

    $page = $pages[0];

    $args = [
        'showPages' => $user['permPages'] ? 'tool-button' : 'tool-button-disabled',
        'isAuthor' => $user['username'] === $page['author'] || $user['permPages'] ?  'tool-button' : 'tool-button-disabled',
        'showEditPages' => $user['permPage'] === '1' ? 'tool-button' : 'tool-button-disabled',
        'showEditUsers' => $user['permUser'] === '1' ? 'tool-button' : 'tool-button-disabled',
        'showEditThemes' => $user['permTheme'] === '1' ? 'tool-button' : 'tool-button-disabled',
        'showEditSettings' => $user['permSettings'] === '1' ? 'tool-button' : 'tool-button-disabled',
    ];

    return loadForm('framework/html/right', $args);
}

?>