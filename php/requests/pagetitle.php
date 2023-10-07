<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../storage/users.php';
require_once __DIR__ . '/../../html/load.php';

function onPagetitle(stdClass|null $args): Reply
{
    if( $args === null ) return new Reply('error', 'Argument saknas vid hämtning av titel');

    $mysqli = dbConnect();

    $settings = selectSettings($mysqli);

    $user = [
            'id' => 0,
            'username' => '',
            'fullname' => '',
            'email' => '',
            'picture' => $settings[0]['logo'],
            'password' => '',
            'permPages' => '0',
            'permBlocks' => '0',
            'permUsers' => '0',
            'permThemes' => '0',
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
    $tooldisp =
        ($args->username && $args->username === $page['author']) ||
        $isAdmin;

    $args = [
        'show' => $page['showTitle'] === '1' || strlen($user['username'])>0 ? 'block' : 'none',
        'showPages' => $user['permPages'] ? 'block' : 'none',
        'isAuthor' => $user['username'] === $page['author'] || $user['permPages'] ? 'block' : 'none',
        'showTitleColor' => $page['showTitle'] === '1' ? $args->showColor : $args->hideColor,
        'showEditPages' => $user['permPages'] === '1' ? 'block' : 'none',
        'showEditUsers' => $user['permUsers'] === '1' ? 'block' : 'none',
        'showEditThemes' => $user['permThemes'] === '1' ? 'block' : 'none',
        'showEditSettings' => $user['permSettings'] === '1' ? 'block' : 'none',
        'author' => $page['author'],
        'pub' => $page['public']==='1' ? 'checked' : '',
        'title' => $page['title'],
        'showIcon' => $page['showTitle'] === '1' ? 'show' : 'hide',
        'showMsg' =>  $page['showTitle'] === '1' ? 'Göm titel. Träder i kraft efter utloggning' : 'Visa titel',
    ];

    return load_requested_page('pagetitle', $args );
}
?>