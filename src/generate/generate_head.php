<?php

require_once __DIR__ . '/generate_css.php';
require_once __DIR__ . '/generate_fonts.php';    
require_once __DIR__ . '/generate_icons.php';
require_once __DIR__ . '/generate_scripts.php';
require_once __DIR__ . '/generate_style.php';

function generate_head(mysqli $db, string $siteName, string $themeName) : string {
    
    $html = '<head>';
    $html.= '<title>' . $siteName . '</title>';
    $html.= '<meta charset="UTF-8">';
    $html.= '<meta name="viewport" content="width=device-width,initial-scale=1.0">';
    $html.= generate_icons();
    $html.= generate_style($db, $themeName);
    $html.= generate_css();
    $html.= generate_scripts();
    $html.= '</head>';

    return $html;
}

?>
