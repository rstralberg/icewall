<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../page/page.php';
require_once __DIR__ . '/../page/pagetheme.php';
require_once __DIR__ . '/../content/content.php';
require_once __DIR__ . '/../theme/theme.php';
require_once __DIR__ . '/../settings/settings.php';

const SiteCols = [
    'name', 
    'owner',
    'logo',
    'folder'
];

function createSite(mysqli $mysqli): void
{
    if (
        dbCreate(
            $mysqli,
            'site',
            array_merge(['id'], SiteCols),            
            [
                'INT(11) NOT NULL AUTO_INCREMENT',
                'VARCHAR(128) NOT NULL DEFAULT \''.DEFAULT_SITENAME.'\'',
                'VARCHAR(128) NOT NULL DEFAULT \''.DEFAULT_SITEOWNER.'\'',
                'VARCHAR(256) NOT NULL DEFAULT \''.DEFAULT_LOGO.'\'',
                'VARCHAR(128) NOT NULL DEFAULT \''.DEFAULT_UPLOAD.'\''
            ])
            
    ) {
        $id = dbAddDefaultRow($mysqli, 'site');
        $sites = dbSelect($mysqli, 'site', ['name', 'folder'], dbWereInt('id', $id));
        if( $sites ) {
            $site = $sites[0];
            createSiteFolder($site['name'], $site['folder']);
        }
    }
}
function selectSite(mysqli $mysqli, string $name): array
{
    return dbSelect($mysqli, 'site', array_merge(['id'], SiteCols), sqlName('name') . '=' . sqlString($mysqli, $name));
}
function updateSite(mysqli $mysqli, string $name, array $cols, array $values): bool
{
    return dbUpdate($mysqli, 'site', $cols, $values, sqlName('name') . '=' . sqlString($mysqli, $name));
}

function insertSite(mysqli $mysqli, array $cols, array $values): int
{
    $id =  dbInsert($mysqli, 'site', $cols, $values);
    if( $id  > 0 ) {
        
        $folder = __DIR__ . '/../../public/sites';
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }
        
        for( $index=0; $index < count($cols); $index++) {
            if( $cols[$index]=== 'folder' ) {
                createSiteFolder($values[0], $values[$index]);
                break;
            }
        }
    }
    return $id;
}

function deleteSite(mysqli $mysqli, string $name): bool
{
    $sites = selectSite($mysqli, $name);
    if( $sites ) {
        $site = $sites[0];
        if( dbDelete($mysqli, 'site', sqlName('name') . '=' . sqlString($mysqli, $name)) ) {
            // deleteSitePages($mysqli, $site->id);
            // deleteSitePageTheme($mysqli, $site->id);
            // deleteSiteContent($mysqli, $site->id);
            // deleteSiteThemes($mysqli, $site->id);
            // deleteSiteSettings($mysqli, $site->id);
            // deleteSiteUploads($site->upload);
            return true;
        }
    }
    return false;
}

function deleteSiteUploads(string $folder) : void {
    deleteFiles( __DIR__ . '/../../public/uploads/' . $folder ); 
}

function createSiteFolder(string $sitename, string $sitefolder) : void {

    $folder = __DIR__ . '/../../public/sites/' . $sitefolder;
    if (!file_exists($folder)) {
        mkdir($folder, 0777, true);

        $fh = fopen($folder . '/readme.txt', 'w');
        if( $fh ) {
            fwrite($fh, 'This folder contains resources for ' . $sitename);
            fflush($fh);
            fclose($fh);
        }
    }
}

?>