<?php
require_once __DIR__ . '/generate_head.php';
require_once __DIR__ . '/../utils/html.php';

function generate_html(mysqli $db, int $pageId, string $sitekey, string $siteName): string
{

    $html = '<!DOCTYPE html><html lang="sv">';
    $html .= generate_head($db, $siteName, DEFAULT_THEME);

    $html .= '<body>';
    $html .= '<aside class="left">' . load_html(__DIR__ . '/_left.html') . '</aside>';
    $html .= '<div class="container">';
    $html .= '<nav></nav>';
    $html .= '<header></header>';
    $html .= '<main></main>';
    $html .= '<footer></footer>';
    $html .= '</div>';
    $html .= '<aside class="right">' . load_html(__DIR__ . '/_right.html') . '</aside>';
    $html .= '</body>';

    // Jscript loading ....
    $html .= '<script type="module">
                addEventListener("DOMContentLoaded", (event) => { index(' .
        $pageId . ',"' .
        $sitekey . '");})
            </script>';

    return compress_html($html . '</html>');
}
