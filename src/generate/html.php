<?php
require_once __DIR__ . '/head.php';
require_once __DIR__ . '/content_menu/content_menu.php';
require_once __DIR__ . '/admin_menu/admin_menu.php';
require_once __DIR__ . '/../utils/load_html.php';

/*
    ---------------------------------------------------------------------
    |                           HEADER                                  |
    | AVATAR|                  TOP-MENU                         | THEME |
    |-------------------------------------------------------------------|
    |           |               TITLEBAR                    |           |
    |-------------------------------------------------------------------|
    |               |           CONTENT                 |               |
    |               |                                   |               |
    |               |                                   |               |
    |               |                                   |               |
    |               |                                   |               |
    |               |                                   |               |
    |-------------------------------------------------------------------|
    |                           FOOTER                                  |
    |       |                    INFO                           |       |
    |--------------------------------------------------------------------
*/

function html(mysqli $db, int $pageId, string $sitekey, string $siteName, string $siteTheme): string
{

    $html = '<!DOCTYPE html><html lang="sv">';
    $html .= head($db, $siteName, $siteTheme);

    $html .=
    '<body>
        <div id="left-side"></div>
        <div id="header" >
            <div id="top-logo"></div>
            <div id="top-menu"></div>
            <div id="top-avatar"></div>
        </div>
        <div id="title"></div>
        <div id="content"></div>
        <div id="footer">
            <div id="info"></div>
        </div>
        <div id="right-side"></div>
    </body>';

    // Jscript loading ....
    $html .= '<script type="module">
                addEventListener("DOMContentLoaded", (event) => { index(' .
        $pageId . ',"' .
        $sitekey . '");})
            </script>';

    return compress_html($html . '</html>');
}
