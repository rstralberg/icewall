<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';

const ThemeCols = [
    'name',
    'wLeft',
    'wCenter',
    'wRight',

    'vGap',
    'hGap',

    'hApp',
    'hNavbar',
    'hTitle',
    'hFooter',
    'dContent',

    'rNavbar',
    'rTitle',
    'rContent',
    'rFooter',
    'rForm',
    'rInput',
    'rTools',
    'rButton',

    'shNavbar',
    'shTitle',
    'shContent',
    'shFooter',
    'shForm',
    'shButton',
    'shInput',
    'shTools',

    'bdColNavbar',
    'bdColTitle',
    'bdColContent',
    'bdColFooter',
    'bdColForm',
    'bdColButton',
    'bdColInput',
    'bdColTools',

    'bdSizeNavbar',
    'bdSizeTitle',
    'bdSizeContent',
    'bdSizeFooter',
    'bdSizeForm',
    'bdSizeButton',
    'bdSizeInput',
    'bdSizeTools',

    'bgApp',
    'bgNavbar',
    'bgTitle',
    'bgContent',
    'bgFooter',
    'bgForm',
    'bgButton',
    'bgInput',
    'bgHover',
    'bgTools',

    'fgApp',
    'fgNavbar',
    'fgTitle',
    'fgContent',
    'fgFooter',
    'fgForm',
    'fgButton',
    'fgInput',
    'fgHover',
    'fgTools',

    'fzNavbar',
    'fzTitle',
    'fzContent',
    'fzFooter',
    'fzForm',
    'fzInput',
    'fzTools',

    'fwNavbar',
    'fwTitle',
    'fwContent',
    'fwFooter',
    'fwForm',
    'fwInput',
    'fwTools',

    'fsNavbar',
    'fsTitle',
    'fsContent',
    'fsFooter',
    'fsForm',
    'fsInput',
    'fsTools',

    'font',
    'fontsize',
    'iconsfolder'
];

function createThemes(mysqli $mysqli): void
{
    if (
        dbCreate($mysqli, 'theme', array_merge(['id'], ThemeCols), [
            'INT(11) NOT NULL AUTO_INCREMENT',
            // id
            
            'VARCHAR(64) NOT NULL DEFAULT \'Standard\'',
            // name
            'FLOAT NOT NULL DEFAULT 0.3',
            // wLeft
            'FLOAT NOT NULL DEFAULT 2.3',
            // wCenter
            'FLOAT NOT NULL DEFAULT 0.3',
            // wRight
            'TINYINT NOT NULL DEFAULT 20',
            // vGap
            'TINYINT NOT NULL DEFAULT 30',
            // hGap
            'TINYINT NOT NULL DEFAULT 98',
            // hApp
            'FLOAT NOT NULL DEFAULT 0.6',
            // hNavbar
            'FLOAT NOT NULL DEFAULT 0.4',
            // hTitle
            'FLOAT NOT NULL DEFAULT 0.3',
            // hFooter
            'FLOAT NOT NULL DEFAULT 3.0',
            // dContent

            'TINYINT NOT NULL DEFAULT 16',
            // rNavbar
            'TINYINT NOT NULL DEFAULT 16',
            // rTitle
            'TINYINT NOT NULL DEFAULT 16',
            // rContent
            'TINYINT NOT NULL DEFAULT 16',
            // rFooter
            'TINYINT NOT NULL DEFAULT 16',
            // rForm
            'TINYINT NOT NULL DEFAULT 6',
            // rInput
            'TINYINT NOT NULL DEFAULT 16',
            // rTools
            'TINYINT NOT NULL DEFAULT 16',
            // rButton

            'TINYINT NOT NULL DEFAULT 1',
            // shNavbar
            'TINYINT NOT NULL DEFAULT 1',
            // shTitle
            'TINYINT NOT NULL DEFAULT 1',
            // shContent
            'TINYINT NOT NULL DEFAULT 1',
            // shFooter
            'TINYINT NOT NULL DEFAULT 1',
            // shForm
            'TINYINT NOT NULL DEFAULT 1',
            // shButton
            'TINYINT NOT NULL DEFAULT 1',
            // shInput
            'TINYINT NOT NULL DEFAULT 1',
            // shTools

            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColNavbar
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColTitle
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColContent
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColFooter
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColForm
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColButton
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColInput
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColTools

            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeNavbar
            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeTitle
            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeContent
            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeFooter
            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeForm
            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeButton
            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeInput
            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeTools

            'VARCHAR(10) NOT NULL DEFAULT \'#202020\'',
            // bgApp
            'VARCHAR(10) NOT NULL DEFAULT \'#000000\'',
            // bgNavbar
            'VARCHAR(10) NOT NULL DEFAULT \'#000000\'',
            // bgTitle
            'VARCHAR(10) NOT NULL DEFAULT \'#202020\'',
            // bgContent
            'VARCHAR(10) NOT NULL DEFAULT \'#000000\'',
            // bgFooter
            'VARCHAR(10) NOT NULL DEFAULT \'#202020\'',
            // bgForm
            'VARCHAR(10) NOT NULL DEFAULT \'#606060\'',
            // bgButton
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bgInput
            'VARCHAR(10) NOT NULL DEFAULT \'#ff2020\'',
            // bgHover
            'VARCHAR(10) NOT NULL DEFAULT \'#202020\'',
            // bgTools

            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // fgApp
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // fgNavbar
            'VARCHAR(10) NOT NULL DEFAULT \'#f9a915\'',
            // fgTitle
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // fgContent
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // fgFooter
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // fgForm
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // fgButton
            'VARCHAR(10) NOT NULL DEFAULT \'#000000\'',
            // fgInput
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // fgHover
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // fgTools

            'FLOAT NOT NULL DEFAULT 1.1',
            // fzNavbar
            'FLOAT NOT NULL DEFAULT 1.3',
            // fzTitle
            'FLOAT NOT NULL DEFAULT 1.0',
            // fzContent
            'FLOAT NOT NULL DEFAULT 0.9',
            // fzFooter
            'FLOAT NOT NULL DEFAULT 1.0',
            // fzForm
            'FLOAT NOT NULL DEFAULT 1.0',
            // fzInput
            'FLOAT NOT NULL DEFAULT 0.8',
            // fzTools

            'VARCHAR(8) NOT NULL DEFAULT \'bold\'',
            // fwNavbar
            'VARCHAR(8) NOT NULL DEFAULT \'bold\'',
            // fwTitle
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fwContent
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fwFooter
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fwForm
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fwInput
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fwTools

            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fsNavbar
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fsTitle
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fsContent
            'VARCHAR(8) NOT NULL DEFAULT \'italic\'',
            // fsFooter
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fsForm
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fsInput
            'VARCHAR(8) NOT NULL DEFAULT \'normal\'',
            // fsTools

            'VARCHAR(64) NOT NULL DEFAULT \'Ariel\'',
            // font
            'FLOAT NOT NULL DEFAULT 1.0',
            // fontsize
            'VARCHAR(64) NOT NULL DEFAULT \'icons/white\'',
            // iconsfolder
        ])
    ) {
        dbAddDefaultRow($mysqli, 'theme');
    }
}

function selectTheme(mysqli $mysqli, string $name): array
{
    return dbSelect($mysqli, 'theme', array_merge(['id'], ThemeCols), 
        sqlName('name') . '=' . sqlString($mysqli, $name));
}

function selectThemes(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'theme', array_merge(['id'],ThemeCols), 
        null, sqlName('name') . ' asc');
}

function insertTheme(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'theme', ThemeCols, $values);
}

function updateTheme(mysqli $mysqli, $name, $values): int
{
    return dbUpdate($mysqli, 'theme', ThemeCols, $values, 
        sqlName('name') . '=' . sqlString($mysqli, $name));
}

function deleteTheme(mysqli $mysqli, $name): void
{
    dbDelete($mysqli, 'theme', sqlName('name') . '=' . sqlString($mysqli, $name));
}

function selectThemeNames(mysqli $mysqli)
{
    return dbSelect($mysqli, 'theme', ['name']);
}

function selectThemeParts(mysqli $mysqli, array $cols, string $themeName)
{
    return dbSelect($mysqli, 'theme', $cols, sqlName('name') . '=' . sqlString($mysqli, $themeName));
}

?>