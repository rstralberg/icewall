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
    create_themes($db, $site);
    $pageId = create_pages($db, $site);
    create_contents($db, $pageId, $site);
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
    }
}

function create_pages(mysqli $db, array $site): int
{
    if (verify_pages_table($db, $site['key']) ) {
        return db_insert($db, 'pages',
            ['title', 'parentId', 'author', 'showTitle', 'pos', 'isParent', 'isPublic','contentW',
            'contentD','contBg','contFg','contBorder','contShadow','markBg','markFg','markBorder',
            'markShadow','markFsize','markBold','markItalic'],
            get_default_page($db, 'Start',  'admin') 
        );
    }
    return 0;
}

function create_contents(mysqli $db, int $pageId, array $site): void
{
    if (verify_contents_table($db, $site['key'] )) {
        db_insert($db, 'contents',
            ['pageId', 'pos', 'html', 'style', 'isPublic'],
            [$pageId, 0, '<article type="title"><h1>' . $site['title'] . '</h1></article>', 'text-align="center"', 1]
        );
    }
}


function create_themes(mysqli $db, array $site): void
{
    if (verify_themes_table($db, $site['key'])) {
        db_insert($db,'themes', 
            [
            'name',
            'font',
            
            'headerT',
            'headerH',
            'footerB',
            'footerH',
            'titleH',
            'menuW',
            'infoW',
            'titleW',
            'contentW',
            'contentD',

            'radius',
            'linkFg',
            'appBg',
            
            'barsBg',
            'barsFg',
            'barsBorder',
            'barsShadow',
                    
            'tbarDisplay',
            'tbarBold',
            'tbarItalic',
            'tbarFsize',
            
            'nbarBold',
            'nbarItalic',
            'nbarFsize',
            'nbarBgHi',
            'nbarFgHi',
                    
            'fbarBold',
            'fbarItalic',
            'fbarFsize',
            
            'contBg',
            'contFg',
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
            'inpBorder',

            'markBg',
            'markFg',
            'markBorder',
            'markShadow',
            'markFsize',
            'markBold',
            'markItalic'
    
        ],
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
