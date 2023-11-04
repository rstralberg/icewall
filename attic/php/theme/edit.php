<?php

require_once __DIR__ . '/../tools/reply.php';
require_once __DIR__ . '/../tools/loadForm.php';
// require_once __DIR__ . '/../framework/fonts.php';
// require_once __DIR__ . '/theme.php';


function editThemes(stdClass|null $args) : Reply {
    return new Reply(false,'');
    // $db = new db(); 
    // $db->open($args->database);
    
    // $themes = selectThemeNames($db);
    // $db->close();

    // $fonts = getFontNames();

    // $strFonts = '';
    // for( $i=0; $i < count($fonts); $i++) {
    //     $strFonts .= '<option class="theme-option" value="' . $fonts[$i] . '">'. $fonts[$i] . '</option>';
    // }

    // $strThemes = '';
    // for( $i=0; $i < count($themes); $i++) {
    //     $strThemes .= '<option class="theme-option" value="' . $themes[$i]['name'] . '">'  . $themes[$i]['name'] . '</option>';
    // }

    // return loadForm('theme/html/edit', [
    //     'fonts' => $strFonts,
    //     'themes' => $strThemes
    // ]);
}
?>
