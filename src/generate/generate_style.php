<?php

require_once __DIR__ . '/../db/db.php';

function generate_style(mysqli $db, string $themeName): string
{
    $themes = db_select($db, 'themes', ['*'], db_where($db, 'name', $themeName));
    if( !$themes ) {
        throw new Exception('Kunde inte ladda applikationens tema ' . $themeName);
    }
    $theme = $themes[0];

    $root = ':root {';

    $root .= '--theme:"' . $theme['name'] . '";';
    $root .= '--appWLeft:' . $theme['wLeft'] . ';';
    $root .= '--appWCenter:' . $theme['wCenter'] . ';';
    $root .= '--appWRight:' . $theme['wRight'] . ';';

    $root .= '--appVGap:' . $theme['vGap'] . ';';
    $root .= '--appGGap:' . $theme['hGap'] . ';';

    $styles = db_select($db, 'styles',['*'], db_where($db, 'theme', $theme['name']));
    foreach($styles as $style ) {
        $name = $style['name'];
        $root .= '--' . $name . 'Bg:' . $style['bg'] . ';';
        $root .= '--' . $name . 'Fg:' . $style['fg'] . ';';
        $root .= '--' . $name . 'BgHi:' . $style['bgHi'] . ';';
        $root .= '--' . $name . 'FgHi:' . $style['fgHi'] . ';';
        $root .= '--' . $name . 'BgDis:' . $style['bgDis'] . ';';
        $root .= '--' . $name . 'FgDis:' . $style['fgDis'] . ';';
        $root .= '--' . $name . 'BorderSize:' . $style['borderSize'] . 'px;';
        $root .= '--' . $name . 'BorderColor:' . $style['borderColor'] . ';';
        $root .= '--' . $name . 'BorderRadius:' . $style['borderRadius'] . 'px;';
        $root .= '--' . $name . 'Fontfam:' . $style['fontfam'] . ';';
        $root .= '--' . $name . 'Fontsize:' . $style['fontsize'] . 'em;';
        $root .= '--' . $name . 'Fontweight:' . $style['fontweight'] . ';';
        $root .= '--' . $name . 'Fontstyle:' . $style['fontstyle'] . ';';
        $root .= '--' . $name . 'Height:' . $style['height'] . ';';
        $root .= '--' . $name . 'Width:' . $style['width'] . ';';
        $root .= '--' . $name . 'Shadows:' . $style['shadows'] . ';';
    }

    $root .= '}';
    return '<style>' . $root . '</style>';
    }