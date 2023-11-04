<?php
require_once __DIR__ . '/generateHead.php';
require_once __DIR__ . '/../tools/html.php';

function generateHtml(Db $db, int $pageId, string $sitekey, string $siteName): string
{

    $html = '<!DOCTYPE html><html lang="sv">';
    $html .= generateHead($db, $siteName, DEFAULT_THEME);

    $html .= '<body>';
    $html .= '<div class="container">';
    $html .= '<div class="navbar"></div>';
    $html .= '<div class="titlebar"></div>';
    $html .= '<div class="content"></div>';
    $html .= '<div class="footer"></div>';
    $html .= '<div class="right">' . loadHTML(__DIR__ . '/_right.html') . '</div>';
    $html .= '<div class="left">' . loadHTML(__DIR__ . '/_left.html') . '</div>';
    $html .= '</div>';
    $html .= '</body>';

    // Jscript loading ....
    $html .= '<script type="module">
                addEventListener("DOMContentLoaded", (event) => { index(' .
        $pageId . ',"' .
        $sitekey . '","' .
        $siteName . '");})
            </script>';

    return compressHTML($html . '</html>');
}
