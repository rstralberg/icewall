<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/themes.php';
require_once __DIR__ . '/../generators/fonts.php';
require_once __DIR__ . '/../../html/load.php';


function onEditThemes(stdClass|null $args) : Reply {

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
        $strThemes .= '<option class="theme-option" value="' . $themes[$i]['theme'] . '">'  . $themes[$i]['theme'] . '</option>';
    }

    return load_requested_page('edit_themes', [
        'fonts' => $strFonts,
        'themes' => $strThemes
    ]);
}
?>
