<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../tables/verify_contents_table.php';
require_once __DIR__ . '/../tables/verify_pages_table.php';
require_once __DIR__ . '/../tables/verify_sites_table.php';
require_once __DIR__ . '/../tables/verify_styles_table.php';
require_once __DIR__ . '/../tables/verify_themes_table.php';
require_once __DIR__ . '/../tables/verify_users_table.php';

function create_sitetables(array $site): void
{
    $db = db_open($site['key']);

    create_site($db, $site);
    $pageId = create_pages($db, $site);
    create_contents($db, $pageId, $site);
    create_styles($db, $site);
    create_themes($db, $site);
    create_users($db, $site);

    db_close($db);
}

function create_site(mysqli $db, array $site): void
{
    if( verify_sites_table($db, $site['key']) ) {
        db_insert($db, 'sites',
            ['key', 'title', 'owner', 'email', 'logo', 'theme'],
            [$site['key'], $site['title'], $site['owner'], $site['email'], $site['logo'], $site['theme']]
        );
    } else {
        db_update($db, 'sites',
            ['title', 'owner', 'email', 'logo', 'theme'],
            [$site['title'], $site['owner'], $site['email'], $site['logo'], $site['theme']],
            db_where($db, 'key', $site['key'])
        );
    }
}

function create_pages(mysqli $db, array $site): int
{
    if (verify_pages_table($db, $site['key']) ) {
        return db_insert($db, 'pages',
            ['title', 'parentId', 'author', 'showTitle', 'pos', 'isParent', 'isPublic'],
            ['Start', 0, 'admin', 1, 0, 0, 1]
        );
    }
    return 0;
}

function create_contents(mysqli $db, int $pageId, array $site): void
{
    if (verify_contents_table($db, $site['key'] )) {
        db_insert($db, 'contents',
            ['pageId', 'pos', 'html', 'isPublic'],
            [$pageId, 0, $site['title'], 1]
        );
    }
}

function create_styles(mysqli $db, array $site): void
{
    if (verify_styles_table($db, $site['key']) ) {
        $styles = get_default_styles();
        foreach ($styles as $style) {
            db_insert($db, 'styles', [
                'theme', 'name',
                'bg', 'fg', 'bgHi', 'fgHi', 'bgDis', 'fgDis',
                'borderSize', 'borderColor', 'borderRadius',
                'fontfam', 'fontsize', 'fontweight', 'fontstyle',
                'height', 'width', 'shadows'], [
                $site['theme'], $style['name'],
                $style['bg'], $style['fg'], $style['bgHi'], $style['fgHi'], $style['bgDis'], $style['fgDis'],
                $style['borderSize'], $style['borderColor'], $style['borderRadius'],
                $style['fontfam'], $style['fontsize'], $style['fontweight'], $style['fontstyle'],
                $style['height'], $style['width'], $style['shadows'],
            ]);
        }
    }
}

function create_themes(mysqli $db, array $site): void
{
    if (verify_themes_table($db, $site['key'])) {
        db_insert($db,'themes', 
            ['name', 'wLeft', 'wCenter', 'wRight', 'vGap', 'hGap', 'hApp'],
            get_default_theme($site['theme'])
        );
    }
}

function create_users(mysqli $db, array $site): void
{
    if ( verify_users_table($db, $site['key']) ) {
        db_insert($db, 'users', ['username', 'fullname', 'email', 'picture', 'password'],
            get_default_user( $site['owner'], $site['email']));
    }
}
