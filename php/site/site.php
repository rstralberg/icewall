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

function createSite(Db $db): void
{
    if (
        $db->createTable(
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
        $id = $db->addDefaultRow('site');
        $sites = $db->select( 'site', ['name', 'folder'], $db->where('id', $id));
        if( $sites ) {
            $site = $sites[0];
            createSiteFolder($site['name'], $site['folder']);
        }
    }
}
function selectSite(Db $db, string $name): array
{
    return $db->select( 'site', array_merge(['id'], SiteCols), $db->name('name') . '=' . $db->string( $name));
}
function updateSite(Db $db, string $name, array $cols, array $values): bool
{
    return $db->update( 'site', $cols, $values, $db->name('name') . '=' . $db->string( $name));
}

function insertSite(Db $db, array $cols, array $values): int
{
    $id =  $db->insert('site', $cols, $values);
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

function deleteSite(Db $db, string $name): bool
{
    $sites = selectSite($db, $name);
    if( $sites ) {
        $site = $sites[0];
        if( $db->delete( 'site', $db->name('name') . '=' . $db->string( $name)) ) {
            // deleteSitePages($db, $site->id);
            // deleteSitePageTheme($db, $site->id);
            // deleteSiteContent($db, $site->id);
            // deleteSiteThemes($db, $site->id);
            // deleteSiteSettings($db, $site->id);
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

        $fh = fopen($folder . '/index.php', 'w');
        if( $fh ) {
            fwrite($fh, '<?php header(\'location: /index.php?site=' .$sitename.'&page=0\'); ?>');
            fflush($fh);
            fclose($fh);
        }
    }
}

function generateSites() {

    $fh = fopen(__DIR__ . '/../../sites.json', 'r');
    if( $fh === null )  die ('IceWall: #ERROR. No sites defined. Aborting!');

    $sites = fread($fh, 32000);
    if( $fh === null ) die ('IceWall: #ERROR. No sites defined. Aborting!');

    $sites = json_decode($sites);

    for( $i=0; $i < count($sites->sites); $i++ ) {
        $site = $sites->sites[$i];
        
        $sitefolder = __DIR__ . '/../../public/sites/' . $site->folder;
        if( !file_exists($sitefolder)) {
            mkdir($sitefolder, 0777, true);
        }

        $uploadfolder = $sitefolder . '/uploads';
        if( !file_exists($uploadfolder)) {
            mkdir($uploadfolder, 0777, true);
        }

        $readme = $sitefolder . '/readme.txt';
        if( !file_exists($readme)) {
            $fh = fopen($readme,'w');
            if( $fh )  {
                fwrite($fh, PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, 'This is the root folder for ' . $site->name .  PHP_EOL);
                fwrite($fh, 'Upload for ' . $site->name . ' will got to the subfolder uploads.' . PHP_EOL);
                fwrite($fh, 'Created by IceWall at ' . Date('Y-m-d H:i') . PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, 'Stralberg Development, rstralberg@pm.me' . PHP_EOL);
                fwrite($fh, '=====================================================================' . PHP_EOL);
                fwrite($fh, PHP_EOL);
            }
        }

        $db = new Db($site->database);
        $db->open();
        try {
            createSite($db);
            createSettings($db);
            createPageTheme($db);
            createThemes($db);
            createUser($db);
            createPage($db);
        }
        catch( Exception $e) {
            die( 'Failed to create site "' . $site->name . '"' );
        }
        $db->close();
    }
}

?>