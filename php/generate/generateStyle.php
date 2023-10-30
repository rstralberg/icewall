<?php

function generateStyle(Db $db, string $themeName): string
{
    $themes = $db->select('themes', ['*'], $db->where('name', $themeName));
    if( !$themes ) {
        throw new Exception('Kunde inte ladda applikationens tema ' . $themeName);
    }
    $theme = $themes[0];

    $root = ':root {';

    $root .= '--theme:"' . $theme['name'] . '";';
    $root .= '--appWLeft:' . $theme['wLeft'] . 'fr;';
    $root .= '--appWCenter:' . $theme['wCenter'] . 'fr;';
    $root .= '--appWRight:' . $theme['wRight'] . 'fr;';

    $root .= '--appVGap:' . $theme['vGap'] . 'px;';
    $root .= '--appGGap:' . $theme['hGap'] . 'px;';

    $styles = $db->select('styles',['*'], $db->where('theme', $theme['name']));
    foreach($styles as $style ) {
        $name = $style['name'];
        $root .= '--' . $name . 'Bg:' . $style['bg'] . ';';
        $root .= '--' . $name . 'Fg:' . $style['fg'] . ';';
        $root .= '--' . $name . 'BgHi:' . $style['bgHi'] . ';';
        $root .= '--' . $name . 'FgHi:' . $style['fgHi'] . ';';
        $root .= '--' . $name . 'BgDis:' . $style['bgDis'] . ';';
        $root .= '--' . $name . 'FgDis:' . $style['fgDis'] . ';';
        $root .= '--' . $name . 'BorderSize:' . $style['borderSize'] . ';';
        $root .= '--' . $name . 'BorderColor:' . $style['borderColor'] . ';';
        $root .= '--' . $name . 'BorderRadius:' . $style['borderRadius'] . ';';
        $root .= '--' . $name . 'Fontfam:' . $style['fontfam'] . ';';
        $root .= '--' . $name . 'Fontsize:' . $style['fontsize'] . ';';
        $root .= '--' . $name . 'Fontweight:' . $style['fontweight'] . ';';
        $root .= '--' . $name . 'Fontstyle:' . $style['fontstyle'] . ';';
        $root .= '--' . $name . 'Height:' . $style['height'] . ';';
        $root .= '--' . $name . 'Width:' . $style['width'] . ';';
        $root .= '--' . $name . 'Shadows:' . $style['shadows'] . ';';
    }

    $root .= '}';
    return '<style>' . $root . '</style>';
}