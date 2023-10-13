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
function createPageTheme(mysqli $mysqli): void
{

    if (
        dbCreate($mysqli, 'pagetheme', array_merge(['id'], PageThemeCols), [
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
        dbAddDefaultRow($mysqli, 'pagetheme');
    }
}

function selectPagestyle(mysqli $mysqli, string $name): array
{
    return dbSelect($mysqli, 'pagetheme', array_merge(['id'], PageThemeCols), 
        sqlName('name') . '=' . sqlString($mysqli, $name));
}

function selectPagestyles(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'pagetheme', array_merge(['id'], PageThemeCols), null, sqlName('name') . ' asc');
}

function insertPagestyles(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'pagetheme', PageThemeCols, $values);
}

function updatePagestyles(mysqli $mysqli, $name, $values): int
{
    return dbUpdate($mysqli, 'pagetheme', PageThemeCols, $values, sqlName('name') . '=' . sqlString($mysqli, $name));
}

function deletePagestyles(mysqli $mysqli, $name): void
{
    dbDelete($mysqli, 'pagetheme', sqlName('name') . '=' . sqlString($mysqli, $name));
}

function selectPagestyleNames(mysqli $mysqli)
{
    return dbSelect($mysqli, 'pagetheme', ['name'], null, sqlName('name') . ' asc');
}

function deleteSitePageTheme(mysqli $mysqli, int $siteId) : void {
    $themes = dbSelect($mysqli, 'pagetheme', ['id'], dbWereInt('siteId', $siteId) );
    if( $themes ) {
        foreach($themes as $theme) {
            dbDelete($mysqli, 'pagetheme', dbWereInt('id', $theme['id']));
        }
    }
}

function getPageTheme(stdClass|null $args): Reply
{
    $mysqli = dbConnect();

    $pages = selectPage($mysqli, $args->pageId);
    if( !$pages ) {
        dbDisonnect($mysqli);
        return new Reply('error', 'Kunde inte ladda temat för sidan med id "' . $args->pageId . '"');
    }
    $name = $pages[0]['style'];
    $styles = selectPagestyle($mysqli, $name);
    if (!$styles) {
        dbDisonnect($mysqli);
        return new Reply('error', 'Kunde inte ladda temat "' . $name . '"');
    }

    return new Reply('ok', json_encode($styles[0]));
}

?>