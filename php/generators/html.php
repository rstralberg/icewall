<?php
require_once __DIR__ . '/head.php';
require_once __DIR__ . '/../storage/pages.php';

function generateHTML(mysqli $cli, 
    string $host, 
    string $siteName,
    int $pageId ) : string {

    $page = selectPage($cli, $pageId)[0];

    $html = '<!DOCTYPE html><html lang="sv">';
    $html.= generateHead($cli, $siteName, DEFAULT_THEME);

    $html.= '<body>';
    $html.= '<nav></nav>';
    $html.= '<div id="pagetitle"></div>';
    $html.= '<div id="tools" class="tools" style="display:none"></div>';
    $html.= '<main></main>';
    $html.= '<footer></footer>';
    $html.= '</body>';
    
    // Jscript loading ....
    $html.= '<script type="module">' .
                'addEventListener("DOMContentLoaded", (event) => '.
                '{' .
                    'index(\''. $host . '\','. $pageId . ',' . $page['showTitle'] . ');' .
                '})'.
            '</script>';

    return $html . '</html>';
}
?>