<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/utils/error.php';

require_once __DIR__ . '/utils/db.php';
require_once __DIR__ . '/theme/theme.php';
require_once __DIR__ . '/content/content.php';
require_once __DIR__ . '/page/page.php';
require_once __DIR__ . '/user/user.php';
require_once __DIR__ . '/site/site.php';

require_once __DIR__ . '/framework/fonts.php';
require_once __DIR__ . '/framework/html.php';

// Generate any new sites
generateSites();

// Get site and page id to load
$siteKey = '';
if (array_key_exists('site', $_GET)) {
    $siteKey = $_GET['site'];
}
if ($siteKey === '')
    die('IceWall: #ERROR. No site given in argument. Aborting!');

// We need site information
$fh = fopen(__DIR__ . '/../sites.json', 'r');
if ($fh === null)
    die('IceWall: #ERROR. No sites defined. Aborting!');

$sites = fread($fh, 32000);
if ($fh === null)
    die('IceWall: #ERROR. No sites defined. Aborting!');

$sites = json_decode($sites);

// Which site is requested
if ($siteKey === null || strlen($siteKey) === 0)
    die('IceWall: #ERROR. No site given! Aborting!');

// Is the request site really defined
$validSite = null;
for ($i = 0; $i < count($sites->sites); $i++) {
    $s = $sites->sites[$i];
    if ($s->key === $siteKey) {
        $validSite = $s;
        break;
    }
}
if ($validSite === null)
    die('IceWall: #ERROR. Request "' . $siteKey . '" lacks informantion!');

// Database must exist or be created
$db = new Db($validSite->key);
$db->open();


if ($db === null)
    die('IceWall: #ERROR. Failed to open database for "' . $site . '"');

// Greate. Were ready to start
session_start();

// Database support
try {
    $pageId = getFirstPageId($db);

    echo (
        generateHTML(
            $db,
            $validSite->key,
            $validSite->name
        )
    );

    $db->close();
} 
catch (Exception $e) {
    echo ('<br>IceWall: #EXCEPTION ' . $e->getMessage());
}

?>