<?php

function scripts() : string {

    function script($file) :string  {
        return '<script type="application/javascript" src="js/'. $file . '.js"></script>';
    }

    $html = '';

    // Root
    // -----------------------------------------------
    $html .= script('constants');
    $html .= script('index');

    // Bottom
    // -----------------------------------------------
    $html .= script('bottom\bottom');
    
    // Center
    // -----------------------------------------------
    $html .= script('center\content');
    $html .= script('center\delete');
    $html .= script('center\editor');
    $html .= script('center\get');
    $html .= script('center\save');
    $html .= script('center\update');
    
    // Sub
    // -----------------------------------------------
    $html .= script('sub\getSub');

    // Left panel
    // -----------------------------------------------
    $html .= script('left\left');
    
    // Add
    $html .= script('left\add\add');
    
    // Content
    $html .= script('left\content\addContent');
    $html .= script('left\content\content');
    $html .= script('left\content\editPageTheme');
    $html .= script('left\content\toggleShadows');
    $html .= script('left\content\updatePageTheme');
    
    // Top
    // -----------------------------------------------
    // Menu
    $html .= script('top\menu\menu');

    // Logo
    $html .= script('top\logo\account');
    $html .= script('top\logo\login');
    $html .= script('top\logo\logout');
    $html .= script('top\logo\newUser');
    $html .= script('top\logo\password');
    $html .= script('top\logo\user');

    // Section
    $html .= script('left\section\section');
    
    // Right panel
    // -----------------------------------------------
    $html .= script('right\right');
    $html .= script('right\settings');
    
    // Page
    $html .= script('right\page\renamePage');
    $html .= script('right\page\togglePagePublic');
    $html .= script('right\page\toggleTitle');
    
    // Pages
    $html .= script('right\pages\createPage');
    $html .= script('right\pages\deletePage');
    
    // Settings
    $html .= script('right\settings\edit');
    $html .= script('right\settings\update');
    $html .= script('right\settings\editUsers');
    $html .= script('right\settings\editPages');
    $html .= script('right\settings\editSettings');
    $html .= script('right\settings\editTheme');
    
    // Theme
    $html .= script('right\theme\createDefaultTheme');
    $html .= script('right\theme\getTheme');
    $html .= script('right\theme\themeStyles');
    $html .= script('right\theme\theme');
    
    // Theme borders
    $html .= script('right\theme\borders\editborders');

    // Theme colors
    $html .= script('right\theme\colors\getColors');
    $html .= script('right\theme\colors\editColors');

    // Theme delete
    $html .= script('right\theme\delete\deleteTheme');

    // Theme fonts
    $html .= script('right\theme\fonts\editFonts');

    // Theme Layout
    $html .= script('right\theme\layout\editLayout');

    // Theme save
    $html .= script('right\theme\save\saveTheme');
    $html .= script('right\theme\save\saveThemeAs');

    // Theme shadows
    $html .= script('right\theme\shadows\editShadows');

    // Tools
    // -----------------------------------------------
    
    $html .= script('tools\base64');
    $html .= script('tools\conversions');
    $html .= script('tools\cookies');
    $html .= script('tools\element');
    $html .= script('tools\error');
    $html .= script('tools\form');
    $html .= script('tools\getValue');
    $html .= script('tools\page');
    $html .= script('tools\popup');
    $html .= script('tools\select');
    $html .= script('tools\session');
    $html .= script('tools\site');
    $html .= script('tools\srvreq');
    $html .= script('tools\style');
    $html .= script('tools\uploadAudio');
    $html .= script('tools\uploadImage');
    $html .= script('tools\user');
    $html .= script('tools\utils');
    $html .= script('tools\webform');
    return $html;

}

?>