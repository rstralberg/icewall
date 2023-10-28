<?php

require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/../../tools/loadForm.php';
require_once __DIR__ . '/../../tools/fonts.php';
require_once __DIR__ . '/../../db/db.php';


function editThemes(stdClass|null $args) : Reply {

    $argErr = argError('editPageTheme', $args);
    if ($argErr) return $argErr;

    $db = new Db($args->database); 
    $db->open();
    
    $themes = $db->select('theme', ['name'], null, $db->name('name').' asc');
    $db->close();

    $fonts = getFontNames();

    $strFonts = '';
    for( $i=0; $i < count($fonts); $i++) {
        $strFonts .= '<option class="theme-option" value="' . $fonts[$i] . '">'. $fonts[$i] . '</option>';
    }

    $strThemes = '';
    for( $i=0; $i < count($themes); $i++) {
        $strThemes .= '<option class="theme-option" value="' . $themes[$i]['name'] . '">'  . $themes[$i]['name'] . '</option>';
    }

    return loadForm(__DIR__ . '/edit', [
        'fonts' => $strFonts,
        'themes' => $strThemes
    ]);
}
?>
