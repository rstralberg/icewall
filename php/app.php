<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/tools/error.php';
require_once __DIR__ . '/db/db.php';
require_once __DIR__ . '/db/dbManager.php';
require_once __DIR__ . '/generate/generateHtml.php';

class App
{
    public function start(): void
    {

        $dbManager = new dbManager();
        $dbManager->init();

        // Get site and page id to load
        $siteKey = '';
        if (array_key_exists('site', $_GET)) {
            $siteKey = $_GET['site'];
        }
        if ($siteKey === '') {
            die('IceWall: #ERROR. No site given in argument. Aborting!');
        }

        // We need site information
        $db = new Db($siteKey);
        if ($db === null) {
            die('IceWall: #ERROR. Failed to open database for "' . $siteKey . '"');
        }

        if (!$db->open($siteKey)) {
            die('IceWall: #ERROR. Requested site wont load. Aborting!');
        }
        $sites = $db->select('sites', ['key', 'title'], $db->where('key', $siteKey));
        $site = $sites[0];

        // Greate. Were ready to start
        session_start();

        // Lets generate the basic page
        // and then scripts will do the rest
        try {
            $pageId = dbPages::first($db);
            echo (
                generateHtml(
                    $db,
                    $pageId,
                    $site['key'],
                    $site['title']
                ));

            $db->close();
        } catch (Exception $e) {
            echo ('<br>IceWall: #EXCEPTION ' . $e->getMessage());
        }

    }
}
