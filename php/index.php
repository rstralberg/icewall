<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/utils/error.php';

require_once __DIR__ . '/utils/db.php';
require_once __DIR__ . '/theme/theme.php';
require_once __DIR__ . '/settings/settings.php';
require_once __DIR__ . '/content/content.php';
require_once __DIR__ . '/page/page.php';
require_once __DIR__ . '/page/pagetheme.php';
require_once __DIR__ . '/user/user.php';
require_once __DIR__ . '/site/site.php';

require_once __DIR__ . '/framework/fonts.php';
require_once __DIR__ . '/framework/html.php';



$site = $_SERVER['REQUEST_URI']; // = '/km
if ($site === null || $site === '/') {
    echo ('IceWall: #ERROR. No site given! Aborting!');
    return;
}

$site = substr($site, 1);
if ($site === null || strlen($site) === 0) {
    echo ('IceWall: #ERROR. No site given! Aborting!');
    return;
}

if( !dbDatabaseExist($site)) {
    echo ('IceWall: #ERROR. Tried to load "' . $site . '" but no such site here!');
    return;
}

session_start();

// Database support
try {
    $cli = dbConnect($site);

    createSite($cli);
    createSettings($cli);
    createPageTheme($cli);
    createThemes($cli);
    createUser($cli);
    createPage($cli);
    createContents($cli);

    // Settings
    $settingsArray = selectSettings($cli);
    if (!$settingsArray) {
        die('Kan inte ladda inställningar');
    }
    $settings = $settingsArray[0];

    // Get page id to load
    $pageId = getFirstPageId($cli);
    if (array_key_exists('REQUEST_URI', $_SERVER)) {
        $reqPage = ltrim($_SERVER['REQUEST_URI'], '/');
        if (
            strlen($reqPage) > 0 &&
            $reqPage[0] !== '?' &&
            $reqPage[strlen($reqPage) - 1] !== '?'
        ) {
            $pageId = (int) $reqPage; // arg was a page!        
        }
    }

    echo (generateHTML($cli, $settings['name'], $pageId));

    dbDisonnect($cli);
} catch (Exception $e) {
    echo ('<br>IceWall: #EXCEPTION ' . $e->getMessage());
}
?>