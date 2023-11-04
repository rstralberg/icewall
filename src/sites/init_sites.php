<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/load_sites.php';
require_once __DIR__ . '/create_sitefolders.php';
require_once __DIR__ . '/create_sitetables.php';


function init_sites()
{
    if( db_exist('icewall') === false ) {
        db_create_database('icewall');
    }

    $sites = load_sites();
    foreach ($sites as $site) {

        $db = db_open('icewall');
        if( verify_sites_table($db, 'icewall') ) {
            db_insert($db, 'sites',
                ['key', 'title', 'owner', 'email', 'logo', 'theme'],
                [$site->key, $site->title, $site->owner, $site->email, $site->logo, $site->theme],
                [$site['key'], $site['title'], $site['owner'], $site['email'], $site['logo'], $site['theme']]
            );
            db_close($db);
            create_sitefolders($site);
        }
        else {
            db_update($db, 'sites',
                ['title', 'owner', 'email', 'logo', 'theme'],
                [$site['title'], $site['owner'], $site['email'], $site['logo'], $site['theme']],
                db_where($db, 'key', $site['key'])
            );
            db_close($db);
        }
        create_sitetables($site);
    }
}

?>
