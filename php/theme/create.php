<?php

require_once __DIR__ . '/theme.php';

function createDefaultTheme(stdClass $args) : Reply {

    
    $mysqli = dbConnect();
    
    $theme = [
        
            sqlString( $mysqli, $args->themeName), // theme
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
            sqlString( $mysqli, '#404040'), // contentBg
            sqlString( $mysqli, '#ffffff'), // contentFg
            sqlString( $mysqli, '#505050'), // contentActBg
            sqlString( $mysqli, '#ffffff'), // contentActFg
            sqlString( $mysqli, '#ffffff'), // contentBdFg
            sqlString( $mysqli, '1px'), // contentBdW
            sqlBoolean(true), // contentShadow
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
    ];
    
    $id = insertTheme($mysqli,$theme);
    
    dbDisonnect($mysqli);
    return new Reply( $id>0? 'ok':'error', $id);
}
?>