<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/../framework/fonts.php';
require_once __DIR__ . '/theme.php';


function editThemes(stdClass|null $args) : Reply {

    $mysqli = dbConnect();
    $themes = selectThemeNames($mysqli);
    dbDisonnect($mysqli);

    $fonts = getFontNames();

    $strFonts = '';
    for( $i=0; $i < count($fonts); $i++) {
        $strFonts .= '<option class="theme-option" value="' . $fonts[$i] . '">'. $fonts[$i] . '</option>';
    }

    $strThemes = '';
    for( $i=0; $i < count($themes); $i++) {
        $strThemes .= '<option class="theme-option" value="' . $themes[$i]['name'] . '">'  . $themes[$i]['name'] . '</option>';
    }

    return loadForm('theme/html/edit', [
        'fonts' => $strFonts,
        'themes' => $strThemes
    ]);
}
?>
