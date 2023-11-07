<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../tables/contents_table.php';
require_once __DIR__ . '/../tables/pages_table.php';
require_once __DIR__ . '/../tables/sites_table.php';
require_once __DIR__ . '/../tables/themes_table.php';
require_once __DIR__ . '/../tables/users_table.php';

function create_sitetables(array $site): void
{
    $db = db_open($site['key']);

    create_site($db, $site);
    $pageId = create_pages($db, $site);
    create_contents($db, $pageId, $site);
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


function create_themes(mysqli $db, array $site): void
{
    if (verify_themes_table($db, $site['key'])) {
        db_insert($db,'themes', 
            ['name',
            'font',
            'left',
            'width',
            'vGap',
            'radius',
            'linkFg',
            'appBg',
            
            'barsBg',
            'barsFg',
            'barsBorder',
            'barsShadow',
                    
            'tbarH',
            'tbarBold',
            'tbarItalic',
            'tbarFsize',
            
            'nbarH',
            'nbarBold',
            'nbarItalic',
            'nbarFsize',
            'nbarBgHi',
            'nbarFgHi',
                    
            'fbarH',
            'fbarBold',
            'fbarItalic',
            'fbarFsize',
            
            'contBg',
            'contFg',
            'contW',
            'contBorder',
            'contShadow',
            
            'formBg',
            'formFg',
            'formBorder',
            'formShadow',
            
            'btnH',
            'btnBg',
            'btnFg',
            'btnBgHi',
            'btnFgHi',
            'btnBgDis',
            'btnFgDis',
            'btnBold',
            'btnItalic',
            'btnFsize',
            'btnShadow',
            'btnBorder',
                    
            'inpH',
            'inpBg',
            'inpFg',
            'inpBgHi',
            'inpFgHi',
            'inpBgDis',
            'inpFgDis',
            'inpBold',
            'inpItalic',
            'inpFsize',
            'inpShadow',
            'intBorder'],
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
