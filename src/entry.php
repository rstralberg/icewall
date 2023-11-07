<?php

require_once __DIR__ . '/db/db.php';
require_once __DIR__ . '/sites/init_sites.php';
require_once __DIR__ . '/sites/load_site_from_args.php';
require_once __DIR__ . '/generate/generate_html.php';
require_once __DIR__ . '/tables/pages_table.php';

// create and/or update sites databases and folders
init_sites();

// argument will tell which site to load
$site = load_site_from_args();
if( $site === false ) {
    die('IceWall: #ERROR. Failed to load requested site. Aborting!');
}

// Greate. Were ready to start
session_start();

// Lets generate the basic page
// and then scripts will do the rest
try {
    $db = db_open($site['key']);
    $pageId = get_first_page_id($db);
    db_close($db);
    echo (
        generate_html(
            $db,
            $pageId,
            $site['key'],
            $site['title']
        ));

} 
catch (Exception $e) {
    echo ('<br>IceWall: #EXCEPTION ' . $e->getMessage());
}

?>
