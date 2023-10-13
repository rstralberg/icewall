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
    $mysqli = dbConnect();

    $parts = selectThemeParts($mysqli, $cols, $args->theme);
    if (!$parts) {
        dbDisonnect($mysqli);
        return new Reply('error', 'Kunde inte ladda temat "' . $args->theme . '"');
    }

    return new Reply('ok', json_encode($parts));
}

function getTheme(stdClass|null $args): Reply
{
    $mysqli = dbConnect();

    $themes = selectTheme($mysqli, $args->themeName);
    if (!$themes) {
        dbDisonnect($mysqli);
        return new Reply('error', 'Kunde inte ladda temat "' . $args->themeName . '"');
    }

    return new Reply('ok', json_encode($themes[0]));
}


function getThemeNames(stdClass|null $args) : Reply {

    $mysqli = dbConnect();
    $themenames = selectThemeNames($mysqli);
    if( $themenames ) {
        return new Reply('ok', json_encode($themenames));
    }
    return new Reply('error', 'Hittade några teman');
}

?>