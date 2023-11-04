<?php

require_once __DIR__ . '/../db/db.php';

function load_site_from_args() : array | bool {

    // Get site and page id to load
    $siteKey = '';
    if (array_key_exists('site', $_GET)) {
        $siteKey = $_GET['site'];
    }
    if ($siteKey === '') {
        return false;
    }

    // We need site information
    $db = db_open($siteKey);
    $sites = db_select($db, 'sites', ['key', 'title'], db_where($db,'key', $siteKey));
    db_close($db);
    
    return $sites[0];
}

?>
