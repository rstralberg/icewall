<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../page/page.php';
require_once __DIR__ . '/../content/content.php';
require_once __DIR__ . '/../theme/theme.php';

class Site
{

    public $key;
    public $name;
    public $url;
    public $owner;
    public $logo;
    public $admin;
    public $email;
    public $dbUser;
    public $dbDatabase;
    public $dbPassword;
}
;

function createSites(): void
{

    $sites = loadSites();
    for ($i = 0; $i < count($sites); $i++) {
        $site = $sites[$i];
        $db = new Db();
        $db->open();

        if ($db->select('sites', ['id'], $db->name('key') . '=' . $db->string($site['key']))) {
            $db->delete('sites', $db->name('key') . '=' . $db->string($site['key']));
        }
        $db->insert('sites', [
            'key',
            'name',
            'url',
            'owner',
            'logo',
            'admin',
            'email',
            'dbUser',
            'dbDatabase',
            'dbPassword'
        ], [
            $db->string($site['key']),
            $db->string($site['name']),
            $db->string($site['url']),
            $db->string($site['owner']),
            $db->string($site['logo']),
            $db->string($site['admin']),
            $db->string($site['email']),
            $db->string($site['dbUser']),
            $db->string($site['dbDatabase']),
            $db->string($site['dbPassword'])
        ]);
    }
    $db->close();
}


function loadSites(): array
{

    $fh = fopen(__DIR__ . '/../../sites.json', 'r');
    if ($fh === null)
        die('IceWall: #ERROR. No sites defined. Aborting!');

    $text = fread($fh, 32000);
    fclose($fh);

    if ($text === null || $text === '') {
        die('IceWall: #ERROR. No sites defined. Aborting!');
    }

    $item = json_decode($text);

    $sites = array();
    for ($i = 0; $i < count($item->sites); $i++) {
        $site = $item->sites[$i];
        array_push($sites, [
            'key' => $site->key,
            'name' => $site->name,
            'url' => $site->url,
            'owner' => $site->owner,
            'logo' => $site->logo,
            'admin' => $site->admin,
            'email' => $site->email,
            'dbUser' => $site->dbUser,
            'dbDatabase' => $site->dbDatabase,
            'dbPassword' => $site->dbPassword ]
        );
    }
    return $sites;
}
function generateSites()
{
    createSites();
    
    $sites = loadSites();
    if ($sites === null || count($sites) === 0) {
        die('IceWall: #ERROR. No sites defined. Aborting!');
    }

    for ($i = 0; $i < count($sites); $i++) {
        $site = $sites[$i];

        $sitefolder = __DIR__ . '/../../public/sites/' . $site['key'];
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
                fwrite($fh, 'This is the root folder for ' . $site['name'] . PHP_EOL);
                fwrite($fh, 'Uploads for ' . $site['name'] . ' will got to the subfolders.' . PHP_EOL);
                fwrite($fh, PHP_EOL);
                fwrite($fh, 'You should drop the file image "' . $site['logo'] . '" in the folder "images".' . PHP_EOL);
                fwrite($fh, 'or else you will not get the logo you specified.' . PHP_EOL);
                fwrite($fh, PHP_EOL);
                fwrite($fh, 'Created by IceWall at ' . Date('Y-m-d H:i') . PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, 'Stralberg Development, rstralberg@pm.me' . PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, PHP_EOL);
            }
        }

        $db = new Db($site['key']);
        $db->open();
        try {

            // Create some settings for the site 
            // if not already done
            if (
                $db->createTable(
                    'settings',
                    [
                        'id',
                        'key',
                        'name',
                        'url',
                        'owner',
                        'logo',
                        'admin',
                        'email'],[
                        'INT(11) NOT NULL DEFAULT 1',
                        'VARCHAR(64) NOT NULL DEFAULT \'' . $site['key'] . '\'',
                        'VARCHAR(128) NOT NULL DEFAULT \'' . $site['name'] . '\'',
                        'VARCHAR(128) NOT NULL DEFAULT \'' . $site['url'] . '\'',
                        'VARCHAR(128) NOT NULL DEFAULT \'' . $site['owner'] . '\'',
                        'VARCHAR(256) NOT NULL DEFAULT \'' . $site['logo'] . '\'',
                        'VARCHAR(128) NOT NULL DEFAULT \'' . $site['admin'] . '\'',
                        'VARCHAR(128) NOT NULL DEFAULT \'' . $site['email'] . '\''
                    ]
                )
            ) {
                $db->addDefaultRow('settings');
            }
            createThemes($db);
            createUser($db, $site['admin'], $site['email'], $site['logo'] );
            createPage($db);
            createContents($db, $site['name']);
        } catch (Exception $e) {
            die('Failed to create site "' . $site['name'] . '": ' . $e->getMessage());
        }
        $db->close();
    }
}



?>