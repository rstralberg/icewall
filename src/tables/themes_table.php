<?php

require_once __DIR__ . '/../db/db.php';

// returns true if table was created
function create_themes_table(mysqli $db, string $database): bool
{
    return db_create($db, $database, 'themes', [
        'name',
        'font',
        'left',
        'width',
        'vGap',
        'radius',
        'linkFg',
        'appBg',

        'barsBg',
        'barsFg',
        'barsBorder',
        'barsShadow',
        
        'tbarH',
        'tbarBold',
        'tbarItalic',
        'tbarFsize',

        'nbarH',
        'nbarBold',
        'nbarItalic',
        'nbarFsize',
        'nbarBgHi',
        'nbarFgHi',
        
        'fbarH',
        'fbarBold',
        'fbarItalic',
        'fbarFsize',

        'contBg',
        'contFg',
        'contW',
        'contBorder',
        'contShadow',

        'formBg',
        'formFg',
        'formBorder',
        'formShadow',

        'btnH',
        'btnBg',
        'btnFg',
        'btnBgHi',
        'btnFgHi',
        'btnBgDis',
        'btnFgDis',
        'btnBold',
        'btnItalic',
        'btnFsize',
        'btnShadow',
        'btnBorder',
        
        'inpH',
        'inpBg',
        'inpFg',
        'inpBgHi',
        'inpFgHi',
        'inpBgDis',
        'inpFgDis',
        'inpBold',
        'inpItalic',
        'inpFsize',
        'inpShadow',
        'intBorder',
    ], [
        'VARCHAR(64) NOT NULL UNIQUE',// name
        'VARCHAR(64) NOT NULL',// font
        'VARCHAR(16) NOT NULL',//left
        'VARCHAR(16) NOT NULL',//width
        'VARCHAR(16) NOT NULL',//vGap
        'VARCHAR(16) NOT NULL',//radius
        'VARCHAR(16) NOT NULL',//linkFg
        'VARCHAR(16) NOT NULL',//appBg

        'VARCHAR(16) NOT NULL',//barsBg
        'VARCHAR(16) NOT NULL',//barsFg
        'VARCHAR(32) NOT NULL',//barsBorder
        'VARCHAR(8) NOT NULL',//barsShadow
        
        'VARCHAR(16) NOT NULL',//tbarH
        'VARCHAR(16) NOT NULL',//tbarBold
        'VARCHAR(16) NOT NULL',//tbarItalic
        'VARCHAR(16) NOT NULL',//tbarFsize

        'VARCHAR(16) NOT NULL',//nbarH
        'VARCHAR(16) NOT NULL',//nbarBold
        'VARCHAR(16) NOT NULL',//nbarItalic
        'VARCHAR(16) NOT NULL',//nbarFsize
        'VARCHAR(16) NOT NULL',//nbarBgHi
        'VARCHAR(16) NOT NULL',//nbarFgHi
        
        'VARCHAR(16) NOT NULL',//fbarH
        'VARCHAR(16) NOT NULL',//fbarBold
        'VARCHAR(16) NOT NULL',//fbarItalic
        'VARCHAR(16) NOT NULL',//fbarFsize

        'VARCHAR(16) NOT NULL',//contBg
        'VARCHAR(16) NOT NULL',//contFg
        'VARCHAR(16) NOT NULL',//contW
        'VARCHAR(32) NOT NULL',//contBorder
        'VARCHAR(8) NOT NULL',//contShadow

        'VARCHAR(16) NOT NULL',//formBg
        'VARCHAR(16) NOT NULL',//formFg
        'VARCHAR(32) NOT NULL',//formBorder
        'VARCHAR(8) NOT NULL',//formShadow

        'VARCHAR(16) NOT NULL',//btnH
        'VARCHAR(16) NOT NULL',//btnBg
        'VARCHAR(16) NOT NULL',//btnFg
        'VARCHAR(16) NOT NULL',//btnBgHi
        'VARCHAR(16) NOT NULL',//btnFgHi
        'VARCHAR(16) NOT NULL',//btnBgDis
        'VARCHAR(16) NOT NULL',//btnFgDis
        'VARCHAR(16) NOT NULL',//btnBold
        'VARCHAR(16) NOT NULL',//btnItalic
        'VARCHAR(16) NOT NULL',//btnFsize
        'VARCHAR(8) NOT NULL',//btnShadow
        'VARCHAR(32) NOT NULL',//btnBorder
        
        'VARCHAR(16) NOT NULL',//inpH
        'VARCHAR(16) NOT NULL',//inpBg
        'VARCHAR(16) NOT NULL',//inpFg
        'VARCHAR(16) NOT NULL',//inpBgHi
        'VARCHAR(16) NOT NULL',//inpFgHi
        'VARCHAR(16) NOT NULL',//inpBgDis
        'VARCHAR(16) NOT NULL',//inpFgDis
        'VARCHAR(16) NOT NULL',//inpBold
        'VARCHAR(16) NOT NULL',//inpItalic
        'VARCHAR(16) NOT NULL',//inpFsize
        'VARCHAR(8) NOT NULL',//inpShadow
        'VARCHAR(32) NOT NULL'//intBorder
    ]);
}

// returns true if table was created 
function verify_themes_table(mysqli $db, string $database): bool | string
{
    if (db_table_exist($db, $database, 'themes') === false) {
        return create_themes_table($db, $database) ;
    }
    return false;
}

function get_default_theme(string $name) : array {

    return [
        $name,
        '"Ariel"',// font
        '10vw',// left
        '80vw',// width
        '2vh',// vGap
        '16px',// radius
        '#ffff00',// linkFg
        '#202020',// appBg
        
        '#000000',// barsBg
        '#ffffff',// barsFg
        '1px solid #ffffff',// barsBorder
        '1',// barsShadow
                
        '6vh',// tbarH
        'bold',// tbarBold
        'normal',// tbarItalic
        'large',// tbarFsize
        
        '6vh',// nbarH
        'bold',// nbarBold
        'normal',// nbarItalic
        'large',// nbarFsize
        '#ffff00',// nbarBgHi
        '#000000',// nbarFgHi
                
        '4vh',// fbarH
        'normal',// fbarBold
        'italic',// fbarItalic
        'medium',// fbarFsize
        
        '#303030',// contBg
        '#ffffff',// contFg
        'fit-content%',// contW
        '1px solid #ffffff',// contBorder
        '1',// contShadow
        
        '#202020',// formBg
        '#ffffff',// formFg
        '1px solid #ffffff',// formBorder
        '1',// formShadow
        
        '2em',// btnH
        '#101010',// btnBg
        '#ffffff',// btnFg
        '#ffff00',// btnBgHi
        '#000000',// btnFgHi
        '#404040',// btnBgDis
        '#808080',// btnFgDis
        'bold',// btnBold
        'normal',// btnItalic
        'large', // btnFsize
        '1',// btnShadow
        '1px solid #ffffff',// btnBorder
                
        '2em',// inpH
        '#e0e0e0',// inpBg
        '#000000',// inpFg
        '#ffffff',// inpBgHi
        '#000000',// inpFgHi
        '#404040',// inpBgDis
        '#808080',// inpFgDis
        'bold',// inpBold
        'normal',// inpItalic
        'medium',// inpFsize
        '1',// inpShadow
        '1px solid #ffffff'// intBorder
    ];
}