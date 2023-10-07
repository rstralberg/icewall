<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../config.php';

//          Bg  Fg  ActBg   ActFg   BdFg    BdW Shadow  Font    Fsize   Width   Radius  Folder
// App:     X   X   -       -       -       -   -       X       X       X       X       X
// Edit:    X   X   X       X       X       X   -       -       -       -       -       -
// Tool:    X   X   X       X       X       X   X       -       -       -       -       -
// Title:   X   X   -       -       X       X   X       -       -       -       -       -
// Bar:     X   X   X       X       X       X   X       -       -       -       -       -
// Block:   X   X   X       X       X       X   X       -       -       -       -       -
// Form:    X   X   -       -       X       X   X       -       -       -       -       -
// Btn:     X   X   X       X       X       X   X       -       -       -       -       -
// Inp:     X   X   X       X       X       X   X       -       -       -       -       -
// Link:    X   X   X       X       -       -   -       -       -       -       -       -

function createThemes(mysqli $mysqli): void
{

    if ( dbCreate($mysqli, 'themes', [
            'id',
            'theme',
            'appBg',
            'appFg',
            'appFont',
            'appFsize',
            'appWidth',
            'appRadius',
            'appFolder',
            'editBg',
            'editFg',
            'editActBg',
            'editActFg',
            'editBdFg',
            'editBdW',
            'toolBg',
            'toolFg',
            'toolActBg',
            'toolActFg',
            'toolBdFg',
            'toolBdW',
            'toolShadow',
            'titleBg',
            'titleFg',
            'titleBdFg',
            'titleBdW',
            'titleShadow',
            'barBg',
            'barFg',
            'barActBg',
            'barActFg',
            'barBdFg',
            'barBdW',
            'barShadow',
            'blockBg',
            'blockFg',
            'blockActBg',
            'blockActFg',
            'blockBdFg',
            'blockBdW',
            'blockShadow',
            'formBg',
            'formFg',
            'formBdFg',
            'formBdW',
            'formShadow',
            'btnBg',
            'btnFg',
            'btnActBg',
            'btnActFg',
            'btnBdFg',
            'btnBdW',
            'btnShadow',
            'inpBg',
            'inpFg',
            'inpActBg',
            'inpActFg',
            'inpBdFg',
            'inpBdW',
            'inpShadow',
            'linkBg',
            'linkFg',
            'linkActBg',
            'linkActFg'
            ], [
            'INT(11) NOT NULL AUTO_INCREMENT',  // id
            'VARCHAR(64) NOT NULL' ,// theme
            'VARCHAR(32) NOT NULL' ,// appBg
            'VARCHAR(32) NOT NULL' ,// appFg
            'VARCHAR(64) NOT NULL' ,// appFont
            'VARCHAR(16) NOT NULL' ,// appFsize
            'VARCHAR(16) NOT NULL' ,// appWidth
            'VARCHAR(16) NOT NULL' ,// appRadius
            'VARCHAR(64) NOT NULL' ,// appFolder
            'VARCHAR(32) NOT NULL' ,// editBg
            'VARCHAR(32) NOT NULL' ,// editFg
            'VARCHAR(32) NOT NULL' ,// editActBg
            'VARCHAR(32) NOT NULL' ,// editActFg
            'VARCHAR(32) NOT NULL' ,// editBdFg
            'VARCHAR(16) NOT NULL' ,// editBdW
            'VARCHAR(32) NOT NULL' ,// toolBg
            'VARCHAR(32) NOT NULL' ,// toolFg
            'VARCHAR(32) NOT NULL' ,// toolActBg
            'VARCHAR(32) NOT NULL' ,// toolActFg
            'VARCHAR(32) NOT NULL' ,// toolBdFg
            'VARCHAR(16) NOT NULL' ,// toolBdW
            'TINYINT NOT NULL' ,// toolShadow
            'VARCHAR(32) NOT NULL' ,// titleBg
            'VARCHAR(32) NOT NULL' ,// titleFg
            'VARCHAR(32) NOT NULL' ,// titleBdFg
            'VARCHAR(16) NOT NULL' ,// titleBdW
            'TINYINT NOT NULL' ,// titleShadow'
            'VARCHAR(32) NOT NULL' ,// barBg
            'VARCHAR(32) NOT NULL' ,// barFg
            'VARCHAR(32) NOT NULL' ,// barActBg
            'VARCHAR(32) NOT NULL' ,// barActFg
            'VARCHAR(32) NOT NULL' ,// barBdFg
            'VARCHAR(16) NOT NULL' ,// barBdW
            'TINYINT NOT NULL' ,// barShadow
            'VARCHAR(32) NOT NULL' ,// blockBg
            'VARCHAR(32) NOT NULL' ,// blockFg
            'VARCHAR(32) NOT NULL' ,// blockActBg
            'VARCHAR(32) NOT NULL' ,// blockActFg
            'VARCHAR(32) NOT NULL' ,// blockBdFg
            'VARCHAR(16) NOT NULL' ,// blockBdW
            'TINYINT NOT NULL' ,// blockShadow
            'VARCHAR(32) NOT NULL' ,// formBg
            'VARCHAR(32) NOT NULL' ,// formFg
            'VARCHAR(32) NOT NULL' ,// formBdFg
            'VARCHAR(16) NOT NULL' ,// formBdW
            'TINYINT NOT NULL' ,// formShadow
            'VARCHAR(32) NOT NULL' ,// btnBg
            'VARCHAR(32) NOT NULL' ,// btnFg
            'VARCHAR(32) NOT NULL' ,// btnActBg
            'VARCHAR(32) NOT NULL' ,// btnActFg
            'VARCHAR(32) NOT NULL' ,// btnBdFg
            'VARCHAR(16) NOT NULL' ,// btnBdW
            'TINYINT NOT NULL' ,// btnShadow
            'VARCHAR(32) NOT NULL' ,// inpBg
            'VARCHAR(32) NOT NULL' ,// inpFg
            'VARCHAR(32) NOT NULL' ,// inpActBg
            'VARCHAR(32) NOT NULL' ,// inpActFg
            'VARCHAR(32) NOT NULL' ,// inpBdFg
            'VARCHAR(16) NOT NULL' ,// inpBdW
            'TINYINT NOT NULL' ,// inpShadow
            'VARCHAR(32) NOT NULL' ,// linkBg
            'VARCHAR(32) NOT NULL' ,// linkFg
            'VARCHAR(32) NOT NULL' ,// linkActBg
            'VARCHAR(32) NOT NULL' ,// linkActF
        ]))
    {
        dbInsert($mysqli, 'themes', [
            'theme',
            'appBg',
            'appFg',
            'appFont',
            'appFsize',
            'appWidth',
            'appRadius',
            'appFolder',
            'editBg',
            'editFg',
            'editActBg',
            'editActFg',
            'editBdFg',
            'editBdW',
            'toolBg',
            'toolFg',
            'toolActBg',
            'toolActFg',
            'toolBdFg',
            'toolBdW',
            'toolShadow',
            'titleBg',
            'titleFg',
            'titleBdFg',
            'titleBdW',
            'titleShadow',
            'barBg',
            'barFg',
            'barActBg',
            'barActFg',
            'barBdFg',
            'barBdW',
            'barShadow',
            'blockBg',
            'blockFg',
            'blockActBg',
            'blockActFg',
            'blockBdFg',
            'blockBdW',
            'blockShadow',
            'formBg',
            'formFg',
            'formBdFg',
            'formBdW',
            'formShadow',
            'btnBg',
            'btnFg',
            'btnActBg',
            'btnActFg',
            'btnBdFg',
            'btnBdW',
            'btnShadow',
            'inpBg',
            'inpFg',
            'inpActBg',
            'inpActFg',
            'inpBdFg',
            'inpBdW',
            'inpShadow',
            'linkBg',
            'linkFg',
            'linkActBg',
            'linkActFg'
        ], [
            sqlString( $mysqli, 'Natt'), // theme
            sqlString( $mysqli, '#202020'), // appBg
            sqlString( $mysqli, '#ffffff'), // appFg
            sqlString( $mysqli, 'Ariel'), // appFont
            sqlString( $mysqli, '1em'), // appFsize
            sqlString( $mysqli, '80vw'), // appWidth
            sqlString( $mysqli, '8px'), // appRadius
            sqlString( $mysqli, 'icons/white'), // appFolder
            sqlString( $mysqli, '#303030'), // editBg
            sqlString( $mysqli, '#ffffff'), // editFg
            sqlString( $mysqli, '#404040'), // editActBg
            sqlString( $mysqli, '#ffffff'), // editActFg
            sqlString( $mysqli, '#ffffff'), // editBdFg
            sqlString( $mysqli, '1px'), // editBdW
            sqlString( $mysqli, '#202020'), // toolBg
            sqlString( $mysqli, '#ffffff'), // toolFg
            sqlString( $mysqli, '#ff1010'), // toolActBg
            sqlString( $mysqli, '#ffffff'), // toolActFg
            sqlString( $mysqli, '#ffffff'), // toolBdFg
            sqlString( $mysqli, '1px'), // toolBdW
            sqlBoolean(true), // toolShadow
            sqlString( $mysqli, '#404040'), // titleBg
            sqlString( $mysqli, '#ffff00'), // titleFg
            sqlString( $mysqli, '#fff'), // titleBdFg
            sqlString( $mysqli, '1px'), // titleBdW
            sqlBoolean(true), // titleShadow'
            sqlString( $mysqli, '#101010'), // barBg
            sqlString( $mysqli, '#ffffff'), // barFg
            sqlString( $mysqli, '#ff2200'), // barActBg
            sqlString( $mysqli, '#000000'), // barActFg
            sqlString( $mysqli, '#ffffff'), // barBdFg
            sqlString( $mysqli, '1px'), // barBdW
            sqlBoolean(true), // barShadow
            sqlString( $mysqli, '#404040'), // blockBg
            sqlString( $mysqli, '#ffffff'), // blockFg
            sqlString( $mysqli, '#505050'), // blockActBg
            sqlString( $mysqli, '#ffffff'), // blockActFg
            sqlString( $mysqli, '#ffffff'), // blockBdFg
            sqlString( $mysqli, '1px'), // blockBdW
            sqlBoolean(true), // blockShadow
            sqlString( $mysqli, '#202020'), // formBg
            sqlString( $mysqli, '#ffffff'), // formFg
            sqlString( $mysqli, '#ffffff'), // formBdFg
            sqlString( $mysqli, '2px'), // formBdW
            sqlBoolean(true), // formShadow
            sqlString( $mysqli, '#082626'), // btnBg
            sqlString( $mysqli, '#000000'), // btnFg
            sqlString( $mysqli, '#088686'), // btnActBg
            sqlString( $mysqli, '#000000'), // btnActFg
            sqlString( $mysqli, '#000000'), // btnBdFg
            sqlString( $mysqli, '1px'), // btnBdW
            sqlBoolean(true), // btnShadow
            sqlString( $mysqli, '#ffffff'), // inpBg
            sqlString( $mysqli, '#000000'), // inpFg
            sqlString( $mysqli, '#ffffee'), // inpActBg
            sqlString( $mysqli, '#000000'), // inpActFg
            sqlString( $mysqli, '#000000'), // inpBdFg
            sqlString( $mysqli, '1px'), // inpBdW
            sqlBoolean(true), // inpShadow
            sqlString( $mysqli, '#000000'), // linkBg
            sqlString( $mysqli, '#112244'), // linkFg
            sqlString( $mysqli, '#4400ff'), // linkActBg
            sqlString( $mysqli, '#550022'), // linkActFg
        ]);
    }
}

function selectTheme(mysqli $mysqli, string $name): array
{
    return dbSelect($mysqli, 'themes', [
        'id',
        'theme',
        'appBg',
        'appFg',
        'appFont',
        'appFsize',
        'appWidth',
        'appRadius',
        'appFolder',
        'editBg',
        'editFg',
        'editActBg',
        'editActFg',
        'editBdFg',
        'editBdW',
        'toolBg',
        'toolFg',
        'toolActBg',
        'toolActFg',
        'toolBdFg',
        'toolBdW',
        'toolShadow',
        'titleBg',
        'titleFg',
        'titleBdFg',
        'titleBdW',
        'titleShadow',
        'barBg',
        'barFg',
        'barActBg',
        'barActFg',
        'barBdFg',
        'barBdW',
        'barShadow',
        'blockBg',
        'blockFg',
        'blockActBg',
        'blockActFg',
        'blockBdFg',
        'blockBdW',
        'blockShadow',
        'formBg',
        'formFg',
        'formBdFg',
        'formBdW',
        'formShadow',
        'btnBg',
        'btnFg',
        'btnActBg',
        'btnActFg',
        'btnBdFg',
        'btnBdW',
        'btnShadow',
        'inpBg',
        'inpFg',
        'inpActBg',
        'inpActFg',
        'inpBdFg',
        'inpBdW',
        'inpShadow',
        'linkBg',
        'linkFg',
        'linkActBg',
        'linkActFg'
], sqlName('theme') . '=' . sqlString( $mysqli, $name));
}

function selectThemes(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'themes', [
        'id',
        'theme',
        'appBg',
        'appFg',
        'appFont',
        'appFsize',
        'appWidth',
        'appRadius',
        'appFolder',
        'editBg',
        'editFg',
        'editActBg',
        'editActFg',
        'editBdFg',
        'editBdW',
        'toolBg',
        'toolFg',
        'toolActBg',
        'toolActFg',
        'toolBdFg',
        'toolBdW',
        'toolShadow',
        'titleBg',
        'titleFg',
        'titleBdFg',
        'titleBdW',
        'titleShadow',
        'barBg',
        'barFg',
        'barActBg',
        'barActFg',
        'barBdFg',
        'barBdW',
        'barShadow',
        'blockBg',
        'blockFg',
        'blockActBg',
        'blockActFg',
        'blockBdFg',
        'blockBdW',
        'blockShadow',
        'formBg',
        'formFg',
        'formBdFg',
        'formBdW',
        'formShadow',
        'btnBg',
        'btnFg',
        'btnActBg',
        'btnActFg',
        'btnBdFg',
        'btnBdW',
        'btnShadow',
        'inpBg',
        'inpFg',
        'inpActBg',
        'inpActFg',
        'inpBdFg',
        'inpBdW',
        'inpShadow',
        'linkBg',
        'linkFg',
        'linkActBg',
        'linkActFg'
], null, sqlName('theme') . ' asc');
}

function insertTheme(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'themes', [
        'theme',
        'appBg',
        'appFg',
        'appFont',
        'appFsize',
        'appWidth',
        'appRadius',
        'appFolder',
        'editBg',
        'editFg',
        'editActBg',
        'editActFg',
        'editBdFg',
        'editBdW',
        'toolBg',
        'toolFg',
        'toolActBg',
        'toolActFg',
        'toolBdFg',
        'toolBdW',
        'toolShadow',
        'titleBg',
        'titleFg',
        'titleBdFg',
        'titleBdW',
        'titleShadow',
        'barBg',
        'barFg',
        'barActBg',
        'barActFg',
        'barBdFg',
        'barBdW',
        'barShadow',
        'blockBg',
        'blockFg',
        'blockActBg',
        'blockActFg',
        'blockBdFg',
        'blockBdW',
        'blockShadow',
        'formBg',
        'formFg',
        'formBdFg',
        'formBdW',
        'formShadow',
        'btnBg',
        'btnFg',
        'btnActBg',
        'btnActFg',
        'btnBdFg',
        'btnBdW',
        'btnShadow',
        'inpBg',
        'inpFg',
        'inpActBg',
        'inpActFg',
        'inpBdFg',
        'inpBdW',
        'inpShadow',
        'linkBg',
        'linkFg',
        'linkActBg',
        'linkActFg'
], $values);
}

function updateTheme(mysqli $mysqli, $name, $values): int
{
    return dbUpdate($mysqli, 'themes', [
        'appBg',
        'appFg',
        'appFont',
        'appFsize',
        'appWidth',
        'appRadius',
        'appFolder',
        'editBg',
        'editFg',
        'editActBg',
        'editActFg',
        'editBdFg',
        'editBdW',
        'toolBg',
        'toolFg',
        'toolActBg',
        'toolActFg',
        'toolBdFg',
        'toolBdW',
        'toolShadow',
        'titleBg',
        'titleFg',
        'titleBdFg',
        'titleBdW',
        'titleShadow',
        'barBg',
        'barFg',
        'barActBg',
        'barActFg',
        'barBdFg',
        'barBdW',
        'barShadow',
        'blockBg',
        'blockFg',
        'blockActBg',
        'blockActFg',
        'blockBdFg',
        'blockBdW',
        'blockShadow',
        'formBg',
        'formFg',
        'formBdFg',
        'formBdW',
        'formShadow',
        'btnBg',
        'btnFg',
        'btnActBg',
        'btnActFg',
        'btnBdFg',
        'btnBdW',
        'btnShadow',
        'inpBg',
        'inpFg',
        'inpActBg',
        'inpActFg',
        'inpBdFg',
        'inpBdW',
        'inpShadow',
        'linkBg',
        'linkFg',
        'linkActBg',
        'linkActFg'
], $values, sqlName('theme') . '=' . sqlString( $mysqli, $name));
}

function deleteTheme(mysqli $mysqli, $name): void
{
    dbDelete($mysqli, 'themes', sqlName('theme') . '=' . sqlString( $mysqli, $name));
}

function selectThemeNames(mysqli $mysqli)
{
    return dbSelect($mysqli, 'themes', ['theme']);
}

function selectThemeParts(mysqli $mysqli, array $cols, string $themeName)
{
    return dbSelect($mysqli, 'themes', $cols, sqlName('theme') . '=' . sqlString( $mysqli, $themeName));
}

?>