<?php

require_once __DIR__ . '/../storage/themes.php';

function onGetThemeParts(stdClass|null $args): Reply
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
        case 'block':
            $cols = [
                'blockBg',
                'blockFg',
                'blockActBg',
                'blockActFg',
                'blockBdFg',
                'blockBdW',
                'blockShadow'
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
?>