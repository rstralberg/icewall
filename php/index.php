<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/utils/error.php';

require_once __DIR__ . '/storage/db.php';
require_once __DIR__ . '/storage/themes.php';
require_once __DIR__ . '/storage/settings.php';
require_once __DIR__ . '/storage/blocks.php';
require_once __DIR__ . '/storage/pages.php';
require_once __DIR__ . '/storage/users.php';

require_once __DIR__ . '/generators/fonts.php';
require_once __DIR__ . '/generators/html.php';


session_start();

// Database support
$cli = dbConnect();

createSettings($cli);
createThemes($cli);
createUsers($cli);
createPages($cli);
createBlocks($cli);

// Settings
$settingsArray = selectSettings($cli);
if( !$settingsArray ) {
    die('Kan inte ladda inställningar');
}
$settings = $settingsArray[0];

// Get page id to load
$pageId = getFirstPageId($cli);
if( array_key_exists('REQUEST_URI', $_SERVER) )
{
    $reqPage = ltrim($_SERVER['REQUEST_URI'], '/');
    if( strlen($reqPage) > 0 &&
        $reqPage[0] !== '?' && 
        $reqPage[strlen($reqPage)-1] !== '?' ) {
            $pageId = (int)$reqPage; // arg was a page!        
    }
}

echo( generateHTML($cli, $settings['host'], $settings['name'], $pageId));

dbDisonnect($cli);

?>
