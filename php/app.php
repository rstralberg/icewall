<?php

class App
{

    public function start(): void
    {

        // ==========================
        // === AND HERE WE GO !!! ===
        // ==========================

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

        $db->open();
        $sites = $db->select('sites', ['key', 'title'], $db->whereStr('key', $siteKey));
        if ($sites === false) {
            die('IceWall: #ERROR. Requested site wont load. Aborting!');
        }
        $site = $sites[0];

        // Greate. Were ready to start
        session_start();

        // Lets generate the basic page
        // and then scripts will do the rest
        try {
            $pageId = getFirstPageId($db);

            echo (generateHTML(
                $db,
                $pageId,
                $site['key'],
                $site['title']
            )
            );

            $db->close();
        } catch (Exception $e) {
            echo ('<br>IceWall: #EXCEPTION ' . $e->getMessage());
        }
    }
}
