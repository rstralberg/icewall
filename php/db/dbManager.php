<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/dbPages.php';
require_once __DIR__ . '/dbContents.php';
require_once __DIR__ . '/dbStyles.php';
require_once __DIR__ . '/dbSites.php';
require_once __DIR__ . '/dbThemes.php';
require_once __DIR__ . '/dbUsers.php';

class dbManager
{

    public function init(): void
    {
        $sites = loadSites();
        $this->initSites($sites);
        foreach ($sites as $site) {
            $db = new db();
            $db->open($site['key']);

            $this->initTheme($db, $site);
            $this->initPages($db, $site);
            $this->initUsers($db, $site);
            
            $db->close();
            sleep(2);
        }
    }

    
    private function initSites(array $sites): void
    {
        $db = new db();
        $db->open(DB_DATABASE);
        $dbSites = new dbSites();
        if (!$dbSites->exist($db)) {
            $dbSites->create($db);
        }

        // adding sites information in icewall
        foreach ($sites as $site) {

            if ($db->select('sites', ['key'], $db->where('key', $site['key'])) === false) {
                $db->insert('sites', [
                    'key',
                    'title',
                    'owner',
                    'email',
                    'theme'], [
                    $site['key'],
                    $site['title'],
                    $site['owner'],
                    $site['email'],
                    $site['theme'],
                ]);
            }
            $this->initSiteFolders($site);
        }
        $db->close();

        // adding sites information in icewall
        foreach ($sites as $site) {

            $db = new db();
            $db->open($site['key']);

            $dbSites = new dbSites();
            if (!$dbSites->exist($db)) {
                $dbSites->create($db);
            }
    
            if ($db->select('sites', ['key'], $db->where('key', $site['key'])) === false) {
                $db->insert('sites', [
                    'key',
                    'title',
                    'owner',
                    'email',
                    'theme'], [
                    $site['key'],
                    $site['title'],
                    $site['owner'],
                    $site['email'],
                    $site['theme'],
                ]);
            }
            $db->close();
        }
    }

    private function initSiteFolders(array $site): void
    {
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
                fwrite($fh, 'This is the root folder for ' . $site['title'] . PHP_EOL);
                fwrite($fh, 'Uploads for ' . $site['title'] . ' will got to the subfolders.' . PHP_EOL);
                fwrite($fh, PHP_EOL);
                fwrite($fh, 'Created by IceWall at ' . Date('Y-m-d H:i') . PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, 'Stralberg Development, roland.stralberg@outlook.com' . PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, PHP_EOL);
            }
        }
    }


    private function initTheme(db $db, array $site): void
    {
        $dbThemes = new dbThemes();
        if (!$dbThemes->exist($db)) {
            $dbThemes->create($db);
        }

        $themes = $db->select('themes', ['id'], $db->where('name', $site['theme']));
        if (!$themes) {
            $db->insert('themes', [
                'name',
                'wLeft',
                'wCenter',
                'wRight',
                'vGap',
                'hGap',
                'hApp',
            ], [
                $site['theme'],
                10, // wLeft (%)
                80, // wCenter (%)
                10, // wRight (%)
                20, // vGap (px)
                30, // hGap (px)
                98, // hApp (vh)
            ]);

            $this->initStyles($db, $site);
        }
    }

    private function initStyles(db $db, array $site): void
    {
        $dbStyles = new dbStyles();
        if (!$dbStyles->exist($db)) {
            $dbStyles->create($db);
        }

        $defaults = dbStyles::defaultStyles();
        foreach ($defaults as $default) {
            $this->initStyle($db, $site['theme'], $default);
        }
    }

    private function initStyle(db $db, string $theme, array $values): void
    {

        $styles = $db->select('styles', ['*'], $db->where('theme', $theme) . ' AND ' . $db->where('name', $values[0]));
        if ($styles && count($styles) > 0) {
            return;
        }

        $db->insert('styles', ['theme', 'name', 'bg', 'fg', 'bgHi', 'fgHi', 'bgDis',
            'fgDis', 'borderSize', 'borderColor', 'borderRadius', 'fontfam', 'fontsize',
            'fontweight', 'fontstyle', 'height', 'width', 'shadows',
        ], [
            $theme, $values[0], $values[1], $values[2], $values[3], $values[4], $values[5],
            $values[6], $values[7], $values[8], $values[9], $values[10], $values[11],
            $values[12], $values[13], $values[14], $values[15], $values[16],
        ]);
    }


    private function initPages($db, array $site): void {

        $dbPages = new dbPages();
        if( !$dbPages->exist($db) ) $dbPages->create($db);

        $pages = $db->select('pages', ['id']) ;
        if( !$pages ) {
            $pageId = $db->insert('pages', [
                'title','parentId','author','showTitle',
                'pos','isParent','isPublic'], [
                    'Start',0,'admin',false,0,false,true
            ]);
            $this->initContents($db, $pageId, $site['title']);
        }
    }

    private function initContents($db, int $pageId, $title): void {

        $dbContents = new dbContents();
        if( !$dbContents->exist($db) ) $dbContents->create($db);

        $contents = $db->select('contents', ['id'], $db->where('pageId', $pageId)) ;
        if( !$contents ) {
            $db->insert('contents', [
                'pageId','pos','html', 'isPublic'], [
                    $pageId, 0, $title,true
            ]);
        }
    }


    private function initUsers(db $db, array $site) {

        $dbUsers = new dbUsers();
        if( !$dbUsers->exist($db) ) $dbUsers->create($db);

        $users = $db->select('users', ['id'], $db->where('username', 'admin'));
        if( !$users ) {
            $db->insert('users', [
                'username','fullname','email','picture', 'password'
            ],[
                'admin', $site['owner'], $site['email'], 'icons/avatar.png', password_hash('winterfall', PASSWORD_DEFAULT)
            ]);
        }
    }
}
