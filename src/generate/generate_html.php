<?php
require_once __DIR__ . '/generate_head.php';
require_once __DIR__ . '/generate_user_menu.php';
require_once __DIR__ . '/generate_admin_menu.php';
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

function generate_html(mysqli $db, int $pageId, string $sitekey, string $siteName): string
{

    $html = '<!DOCTYPE html><html lang="sv">';
    $html .= generate_head($db, $siteName, DEFAULT_THEME);

    $html .=
    '<body>
        <div id="user-menu" class="tools">' . generate_user_menu() . '</div>
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
        <div id="admin-menu" class="tools">' . generate_admin_menu() . '</div>
    </body>';

    // Jscript loading ....
    $html .= '<script type="module">
                addEventListener("DOMContentLoaded", (event) => { index(' .
        $pageId . ',"' .
        $sitekey . '");})
            </script>';

    return compress_html($html . '</html>');
}
