<?php

require_once __DIR__ . '/theme.php';

function getThemeParts(stdClass|null $args): Reply
{

    $cols = array();
    switch ($args->part) {
        case 'app':
            $cols = [
                'appBg',
                'appFg',
                'appFont',
                'appFsize',
                'appWidth',
                'appRadius',
                'appFolder'
            ];
            break;
        case 'edit':
            $cols = [
                'editBg',
                'editFg',
                'editActBg',
                'editActFg',
                'editBdFg',
                'editBdW'
            ];
            break;
        case 'tool':
            $cols = [
                'toolBg',
                'toolFg',
                'toolActBg',
                'toolActFg',
                'toolBdFg',
                'toolBdW',
                'toolShadow'
            ];
            break;
        case 'title':
            $cols = [
                'titleBg',
                'titleFg',
                'titleBdFg',
                'titleBdW',
                'titleShadow'
            ];
            break;
        case 'bar':
            $cols = [
                'barBg',
                'barFg',
                'barActBg',
                'barActFg',
                'barBdFg',
                'barBdW',
                'barShadow'
            ];
            break;
        case 'content':
            $cols = [
                'contentBg',
                'contentFg',
                'contentActBg',
                'contentActFg',
                'contentBdFg',
                'contentBdW',
                'contentShadow'
            ];
            break;
        case 'form':
            $cols = [
                'formBg',
                'formFg',
                'formBdFg',
                'formBdW',
                'formShadow'
            ];
            break;
        case 'btn':
            $cols = [
                'btnBg',
                'btnFg',
                'btnActBg',
                'btnActFg',
                'btnBdFg',
                'btnBdW',
                'btnShadow'
            ];
            break;
        case 'inp':
            $cols = [
                'inpBg',
                'inpFg',
                'inpActBg',
                'inpActFg',
                'inpBdFg',
                'inpBdW',
                'inpShadow'
            ];
            break;

        case 'link':
            $cols = [
                'linkBg',
                'linkFg',
                'linkActBg',
                'linkActFg'
            ];
            break;

        default:
            return new Reply('error', 'Okänd Temadel "' . $args->part . '" efterfrågad');

    }
    $db = new Db($args->database); 
    $db->open();

    $parts = selectThemeParts($db, $cols, $args->theme);
    if (!$parts) {
        $db->close();
        return new Reply('error', 'Kunde inte ladda temat "' . $args->theme . '"');
    }
    $db->close();

    return new Reply('ok', json_encode($parts));
}

function getTheme(stdClass|null $args): Reply
{
    $db = new Db($args->database); 
    $db->open();

    $themes = selectTheme($db, $args->themeName);
    if (!$themes) {
        $db->close();
        return new Reply('error', 'Kunde inte ladda temat "' . $args->themeName . '"');
    }
    $db->close();
    return new Reply('ok', json_encode($themes[0]));
}


function getThemeNames(stdClass|null $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    $themenames = selectThemeNames($db);
    if( $themenames ) {
        $db->close();
        return new Reply('ok', json_encode($themenames));
    }
    $db->close();
    return new Reply('error', 'Hittade några teman');
}

?>