<?php

require_once __DIR__ . '/generateCss.php';
require_once __DIR__ . '/generateFonts.php';    
require_once __DIR__ . '/generateIcons.php';
require_once __DIR__ . '/generateScripts.php';
require_once __DIR__ . '/generateStyle.php';

function generateHead(Db $db, string $siteName, string $themeName) : string {
    
    $html = '<head>';
    $html.= '<title>' . $siteName . '</title>';
    $html.= '<meta charset="UTF-8">';
    $html.= '<meta name="viewport" content="width=device-width,initial-scale=1.0">';
    $html.= generateIcons();
    $html.= generateStyle($db, $themeName);
    $html.= generateCss();
    $html.= generateScripts();
    $html.= '</head>';

    return $html;
}

?>
