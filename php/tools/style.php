<?php
require_once __DIR__ . '/../db/db.php';

function style(Db $db, int $pageId, string $themeName): string
{
    $themes = $db->select('theme', ['*'], $db->name('name') . '=' . $db->string($themeName));
    if (count($themes) === 0) {
        throw new Exception('Kunde inte ladda applikationens tema ' . $themeName);
    }

    $theme = $themes[0];

    $root = ':root {';

    $root .= '--name:"' . $theme['name'] . '";';
    
    $root .= '--wCenter:' . $theme['wCenter'] . '%;';
    $root .= '--vGap:' . $theme['vGap'] . 'px;';
    $root .= '--hGap:' . $theme['hGap'] . 'px;';

    $root .= createStyle($db, $theme, 'App' );
    $root .= createStyle($db, $theme, 'Top' );
    $root .= createStyle($db, $theme, 'Sub' );
    $root .= createStyle($db, $theme, 'Center' );
    $root .= createStyle($db, $theme, 'Sections' );
    $root .= createStyle($db, $theme, 'Bottom' );
    $root .= createStyle($db, $theme, 'Forms' );
    $root .= createStyle($db, $theme, 'Buttons' );
    $root .= createStyle($db, $theme, 'Fields' );
    $root .= createStyle($db, $theme, 'Titles' );

    $root .= '}';
    return '<style>' . $root . '</style>';
}

function createStyle(Db $db, array $theme, string $id ) : string {

    $styleId = $theme['id'.$id];

    $styles = $db->select('styles', ['*'], $db->name('id') . '='. $styleId);
    if ( $styles ) {
        $style = $styles[0];
        $id = lcfirst( $id );
        $root  = '--' . strtolower($id) . 'Name:"' . $style['name'] . '";';
        $root .= '--' . $id . 'Bg:' . $style['bg'] . ';';
        $root .= '--' . $id . 'Fg:' . $style['fg'] . ';';
        $root .= '--' . $id . 'BgHi:' . $style['bgHi'] . ';';
        $root .= '--' . $id . 'FgHi:' . $style['fgHi'] . ';';
        $root .= '--' . $id . 'BgDis:' . $style['bgDis'] . ';';
        $root .= '--' . $id . 'FgDis:' . $style['fgDis'] . ';';
        $root .= '--' . $id . 'BorderSize:' . $style['borderSize'] . 'px;';
        $root .= '--' . $id . 'BorderColor:' . $style['borderColor'] . ';';
        $root .= '--' . $id . 'BorderRadius:' . $style['borderRadius'] . 'px;';
        $root .= '--' . $id . 'Fontfam:"' . $style['fontfam'] . '";';
        $root .= '--' . $id . 'Fontsize:' . $style['fontsize'] . 'em;';
        $root .= '--' . $id . 'Fontweight:' . $style['fontweight'] . ';';
        $root .= '--' . $id . 'Fontstyle:' . $style['fontstyle'] . ';';
        $root .= '--' . $id . 'Height:' . $style['height'] . 'vh;';
        $root .= '--' . $id . 'Width:' . $style['width'] . '%;';
        $root .= '--' . $id . 'Shadows:' . $style['shadows'] . ';';
        return $root;
    }
    return '';
}
