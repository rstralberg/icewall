<?php

require_once __DIR__ . '/dbPages.php';
require_once __DIR__ . '/dbSections.php';
require_once __DIR__ . '/dbStyles.php';
require_once __DIR__ . '/dbSites.php';
require_once __DIR__ . '/dbThemes.php';
require_once __DIR__ . '/dbUsers.php';

class dbManager {

    public function init() : void {

        $db = new Db(); // will choose 'icewall'
        $db->open();
        $dbSites = new dbSites();
        if( !$dbSites->exist($db) ) {
            $dbSites->create($db);
        }
        
        // adding/updating sites information in icewall
        $sites = loadSites();
        foreach( $sites as $site) {

            if( $db->select('sites', ['key'], $db->where('key',$site['key'])) === false ) {
                $db->insert('sites', [
                'key',
                'title',
                'owner',
                'email'], [
                    $site['key'],
                    $site['title'],
                    $site['owner'],
                    $site['email']
                ]);
            } else {
                $db->update('sites', [
                    'title',
                    'owner',
                    'email',], [
                        $site['title'],
                        $site['owner'],
                        $site['email']
                    ],
                $db->whereStr('key', $site['key']));
            }
        }
        // done! we can close icewall now
        $db->close();

        // now lets ensure that all site folders and files are there
        foreach( $sites as $site) {

            // each site have its own database
            $db = new Db($site['key§']);
            $db->open();

            $dbSite = new dbSites();
            if( $dbSite->exist($db) ) {
                // update
                $db->update('sites', [
                    'title',
                    'owner',
                    'email'],[
                        $site['title'],
                        $site['owner'],
                        $site['email']
                    ],
                    $db->whereStr('key', $site['key']));
            } else {
                // create and insert
                $dbSite->create($db);
                $db->insert('sites', [
                    'key',
                    'title',
                    'owner',
                    'email'], [
                        $site['key'],
                        $site['title'],
                        $site['owner'],
                        $site['email']
                    ]);
            }

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

            $db->addDefaultRow('pages');
            $db->addDefaultRow('sections');
            $db->addDefaultRow('styles');
            $db->addDefaultRow('themes');
            $db->addDefaultRow('users');

            $db->close();
    
        }
    }
}