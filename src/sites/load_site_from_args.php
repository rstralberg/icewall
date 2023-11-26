<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../config.php';

function load_site_from_args() : array | bool {

    // Get site and page id to load
    $siteKey = '';
    if (array_key_exists('REQUEST_URI', $_SERVER)) {
        $siteKey = substr($_SERVER['REQUEST_URI'],1);
    }
    if ($siteKey === '') { 
        $siteKey = DEFAULT_UPLOAD;
    }

    // We need site information
    $db = db_open($siteKey);
    $sites = db_select($db, 'sites', ['key', 'title'], db_where($db,'key', $siteKey));
    db_close($db);
    
    return $sites[0];
}

?>
