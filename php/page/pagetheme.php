<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';

const PageThemeCols = [
    'name',
    'wContent',
    'rContent',
    'shContent',
    'bdColContent',
    'bdSizeContent',
    'bgContent',
    'fgContent',
    'bgContentAct',
    'fgContentAct',
    'fzContent',
    'fwContent',
    'fsContent',
    'fontContent'
];
function createPageTheme(Db $db): void
{

    if (
        $db->createTable('pagetheme', array_merge(['id'], PageThemeCols), [
            'INT(11) NOT NULL AUTO_INCREMENT',
            // id

           'VARCHAR(64) NOT NULL DEFAULT \'Standard\'',
           'TINYINT NOT NULL DEFAULT 80', // wContent'
           'TINYINT NOT NULL DEFAULT 16', // rContent'
           'TINYINT NOT NULL DEFAULT 1', // shContent'
           'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'', // bdColContent'
           'TINYINT NOT NULL DEFAULT 1', // bdSizeContent'
           'VARCHAR(10) NOT NULL DEFAULT \'#404040\'', // bgContent'
           'VARCHAR(10) NOT NULL DEFAULT \'#aaaaaa\'', // fgContent'
           'VARCHAR(10) NOT NULL DEFAULT \'#505050\'', // bgContentAct'
           'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'', // fgContentact'
           'FLOAT NOT NULL DEFAULT 1.0', // fzContent'
           'VARCHAR(8) NOT NULL DEFAULT \'normal\'', // fwContent'
           'VARCHAR(8) NOT NULL DEFAULT \'normal\'', // fsContent'
           'VARCHAR(64) NOT NULL DEFAULT \'Ariel\'', // fontContent


        ])
    ) {
        $db->addDefaultRow('pagetheme');
    }
}

function selectPagestyle(Db $db, string $name): array
{
    return $db->select( 'pagetheme', array_merge(['id'], PageThemeCols), 
        $db->name('name') . '=' . $db->string( $name));
}

function selectPagestyles(Db $db): array
{
    return $db->select( 'pagetheme', array_merge(['id'], PageThemeCols), null, $db->name('name') . ' asc');
}

function insertPagestyles(Db $db, $values): int
{
    return $db->insert( 'pagetheme', PageThemeCols, $values);
}

function updatePagestyles(Db $db, $name, $values): int
{
    return $db->update( 'pagetheme', PageThemeCols, $values, $db->name('name') . '=' . $db->string( $name));
}

function deletePagestyles(Db $db, $name): void
{
    $db->delete( 'pagetheme', $db->name('name') . '=' . $db->string( $name));
}

function selectPagestyleNames(Db $db)
{
    return $db->select( 'pagetheme', ['name'], null, $db->name('name') . ' asc');
}

function deleteSitePageTheme(Db $db, int $siteId) : void {
    $themes = $db->select( 'pagetheme', ['id'], $db->where('siteId', $siteId) );
    if( $themes ) {
        foreach($themes as $theme) {
            $db->delete( 'pagetheme', $db->where('id', $theme['id']));
        }
    }
}

function getPageTheme(stdClass $args): Reply
{
    $db = new Db($args->database);
    $db->open();

    $pages = selectPage($db, $args->pageId);
    if( !$pages ) {
        $db->close();
        return new Reply('error', 'Kunde inte ladda temat för sidan med id "' . $args->pageId . '"');
    }
    $name = $pages[0]['style'];
    $styles = selectPagestyle($db, $name);
    if (!$styles) {
        $db->close();
        return new Reply('error', 'Kunde inte ladda temat "' . $name . '"');
    }
    $db->close();

    return new Reply('ok', json_encode($styles[0]));
}

?>