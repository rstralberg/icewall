<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../page/page.php';
require_once __DIR__ . '/../content/content.php';
require_once __DIR__ . '/../theme/theme.php';
require_once __DIR__ . '/../settings/settings.php';


function generateSites()
{

    $fh = fopen(__DIR__ . '/../../sites.json', 'r');
    if ($fh === null)
        die('IceWall: #ERROR. No sites defined. Aborting!');

    $sites = fread($fh, 32000);
    if ($fh === null)
        die('IceWall: #ERROR. No sites defined. Aborting!');

    $sites = json_decode($sites);

    for ($i = 0; $i < count($sites->sites); $i++) {
        $site = $sites->sites[$i];

        $sitefolder = __DIR__ . '/../../public/sites/' . $site->key;
        if (!file_exists($sitefolder)) {
            mkdir($sitefolder, 0777, true);
        }

        $imagefolder = $sitefolder . '/images';
        if (!file_exists($imagefolder)) {
            mkdir($imagefolder, 0777, true);
        }

        copy(__DIR__ . '/../../public/icons/icewall-512x512.png', $imagefolder . '/icewall-512x512.png');

        $mp3folder = $sitefolder . '/mp3';
        if (!file_exists($mp3folder)) {
            mkdir($mp3folder, 0777, true);
        }

        $readme = $sitefolder . '/readme.txt';
        if (!file_exists($readme)) {
            $fh = fopen($readme, 'w');
            if ($fh) {
                fwrite($fh, PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, 'This is the root folder for ' . $site->name . PHP_EOL);
                fwrite($fh, 'Uploads for ' . $site->name . ' will got to the subfolders.' . PHP_EOL);
                fwrite($fh, 'Created by IceWall at ' . Date('Y-m-d H:i') . PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, 'Stralberg Development, rstralberg@pm.me' . PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, PHP_EOL);
            }
        }

        $db = new Db($site->key);
        $db->open();
        try {

            // Create some settings for the site 
            // if not already done
            if (
                $db->createTable(
                    'settings',
                    [
                        'id',
                        'name',
                        'key',
                        'owner',
                        'logo'
                    ],
                    [
                        'INT(11) NOT NULL AUTO_INCREMENT',
                        'VARCHAR(128) NOT NULL DEFAULT \'' . $site->name . '\'',
                        'VARCHAR(32) NOT NULL DEFAULT \'' . $site->key . '\'',
                        'VARCHAR(128) NOT NULL DEFAULT \'' . $site->owner . '\'',
                        'VARCHAR(256) NOT NULL DEFAULT \'' . $site->logo . '\''
                    ]
                )
            ) {
                $db->addDefaultRow('settings');
            }
            createThemes($db);
            createUser($db);
            createPage($db);
            createContents($db, $site->name);
        } catch (Exception $e) {
            die('Failed to create site "' . $site->name . '": ' . $e->getMessage());
        }
        $db->close();
    }
}

?>