<?php
require_once __DIR__ . '/../storage/themes.php';

function generateStyle(mysqli $mysqli, string $themeName ) : string {

    $themes = selectTheme($mysqli, $themeName);
    if( count($themes) === 0 ) {
        throw new Exception('Kunde inte ladda temat ' . $themeName);
    }
    
    $theme = $themes[0];

    $root = ':root {';

    $root.= '--theme:' . $theme['theme'] . ';';
    $root.= '--appBg:' . $theme['appBg'] . ';';
    $root.= '--appFg:' . $theme['appFg'] . ';';
    $root.= '--appFont:' . $theme['appFont'] . ';';
    $root.= '--appFsize:' . $theme['appFsize'] . ';';
    $root.= '--appWidth:' . $theme['appWidth'] . ';';
    $root.= '--appRadius:' . $theme['appRadius'] . ';';
    $root.= '--appFolder:' . $theme['appFolder'] . ';';
    $root.= '--editBg:' . $theme['editBg'] . ';';
    $root.= '--editFg:' . $theme['editFg'] . ';';
    $root.= '--editActBg:' . $theme['editActBg'] . ';';
    $root.= '--editActFg:' . $theme['editActFg'] . ';';
    $root.= '--editBdFg:' . $theme['editBdFg'] . ';';
    $root.= '--editBdW:' . $theme['editBdW'] . ';';
    $root.= '--toolBg:' . $theme['toolBg'] . ';';
    $root.= '--toolFg:' . $theme['toolFg'] . ';';
    $root.= '--toolActBg:' . $theme['toolActBg'] . ';';
    $root.= '--toolActFg:' . $theme['toolActFg'] . ';';
    $root.= '--toolBdFg:' . $theme['toolBdFg'] . ';';
    $root.= '--toolBdW:' . $theme['toolBdW'] . ';';
    $root.= '--toolShadow:' . $theme['toolShadow'] . ';';
    $root.= '--titleBg:' . $theme['titleBg'] . ';';
    $root.= '--titleFg:' . $theme['titleFg'] . ';';
    $root.= '--titleBdFg:' . $theme['titleBdFg'] . ';';
    $root.= '--titleBdW:' . $theme['titleBdW'] . ';';
    $root.= '--titleShadow:' . $theme['titleShadow'] . ';';
    $root.= '--barBg:' . $theme['barBg'] . ';';
    $root.= '--barFg:' . $theme['barFg'] . ';';
    $root.= '--barActBg:' . $theme['barActBg'] . ';';
    $root.= '--barActFg:' . $theme['barActFg'] . ';';
    $root.= '--barBdFg:' . $theme['barBdFg'] . ';';
    $root.= '--barBdW:' . $theme['barBdW'] . ';';
    $root.= '--barShadow:' . $theme['barShadow'] . ';';
    $root.= '--blockBg:' . $theme['blockBg'] . ';';
    $root.= '--blockFg:' . $theme['blockFg'] . ';';
    $root.= '--blockActBg:' . $theme['blockActBg'] . ';';
    $root.= '--blockActFg:' . $theme['blockActFg'] . ';';
    $root.= '--blockBdFg:' . $theme['blockBdFg'] . ';';
    $root.= '--blockBdW:' . $theme['blockBdW'] . ';';
    $root.= '--blockShadow:' . $theme['blockShadow'] . ';';
    $root.= '--formBg:' . $theme['formBg'] . ';';
    $root.= '--formFg:' . $theme['formFg'] . ';';
    $root.= '--formBdFg:' . $theme['formBdFg'] . ';';
    $root.= '--formBdW:' . $theme['formBdW'] . ';';
    $root.= '--formShadow:' . $theme['formShadow'] . ';';
    $root.= '--btnBg:' . $theme['btnBg'] . ';';
    $root.= '--btnFg:' . $theme['btnFg'] . ';';
    $root.= '--btnActBg:' . $theme['btnActBg'] . ';';
    $root.= '--btnActFg:' . $theme['btnActFg'] . ';';
    $root.= '--btnBdFg:' . $theme['btnBdFg'] . ';';
    $root.= '--btnBdW:' . $theme['btnBdW'] . ';';
    $root.= '--btnShadow:' . $theme['btnShadow'] . ';';
    $root.= '--inpBg:' . $theme['inpBg'] . ';';
    $root.= '--inpFg:' . $theme['inpFg'] . ';';
    $root.= '--inpActBg:' . $theme['inpActBg'] . ';';
    $root.= '--inpActFg:' . $theme['inpActFg'] . ';';
    $root.= '--inpBdFg:' . $theme['inpBdFg'] . ';';
    $root.= '--inpBdW:' . $theme['inpBdW'] . ';';
    $root.= '--inpShadow:' . $theme['inpShadow'] . ';';
    $root.= '--linkBg:' . $theme['linkBg'] . ';';
    $root.= '--linkFg:' . $theme['linkFg'] . ';';
    $root.= '--linkActBg:' . $theme['linkActBg'] . ';';
    $root.= '--linkActFg:' . $theme['linkActFg'] . ';';
    $root .= '}';
    return '<style>' . $root . '</style>';
}
