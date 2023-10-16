<?php

require_once __DIR__ . '/css.php';
require_once __DIR__ . '/fonts.php';
require_once __DIR__ . '/icons.php';
require_once __DIR__ . '/scripts.php';
require_once __DIR__ . '/style.php';

function generateHead(Db $cli, int $pageId, string $siteName, string $themeName) : string {
    
    $html = '<head>';
    $html.= '<title>' . $siteName . '</title>';
    $html.= '<meta charset="UTF-8">';
    $html.= '<meta name="viewport" content="width=device-width,initial-scale=1.0">';
    $html.= generateIcons();
    $html.= generateStyle($cli, $pageId, $themeName);
    $html.= generateCss();
    $html.= generateScripts();
    $html.= '</head>';

    return $html;
}

?>
