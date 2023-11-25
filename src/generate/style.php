<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db/db.php';

function style(mysqli $db, string $themeName, int $pageId): string
{
    $themes = db_select($db, 'themes', ['*'], db_where($db, 'name', $themeName));
    if( $themes === false || gettype($themes) === 'string' ) {
        $themes = db_select($db, 'themes', ['*'], db_where($db, 'name', DEFAULT_THEME ));
        if( $themes === false || gettype($themes) === 'string' ) {
            throw new Exception('Kunde inte ladda applikationens tema ' . $themeName);
        }
    }
    $theme = $themes[0];

    $root = ':root {';

    $root .= '--theme:' . $theme['name'] . ';';

    $root .= '--font:' . $theme['font'] . ';';

    $root .= '--headerT:' . $theme['headerT'] . ';';
    $root .= '--headerH:' . $theme['headerH'] . ';';
    $root .= '--footerB:' . $theme['footerB'] . ';';
    $root .= '--footerH:' . $theme['footerH'] . ';';
    $root .= '--titleH:' . $theme['titleH'] . ';';
    $root .= '--menuW:' . $theme['menuW'] . ';';
    $root .= '--infoW:' . $theme['infoW'] . ';';
    $root .= '--titleW:' . $theme['titleW'] . ';';

    $root .= '--radius:' . $theme['radius'] . ';';
    $root .= '--linkFg:' . $theme['linkFg'] . ';';
    $root .= '--appBg:' . $theme['appBg'] . ';';
    
    $root .= '--barsBg:' . $theme['barsBg'] . ';';
    $root .= '--barsFg:' . $theme['barsFg'] . ';';
    $root .= '--barsBorder:' . $theme['barsBorder'] . ';';
    $root .= '--barsShadow:' . $theme['barsShadow'] . ';';
            
    $root .= '--tbarDisplay:' . $theme['tbarDisplay'] . ';';
    $root .= '--tbarBold:' . $theme['tbarBold'] . ';';
    $root .= '--tbarItalic:' . $theme['tbarItalic'] . ';';
    $root .= '--tbarFsize:' . $theme['tbarFsize'] . ';';
    
    $root .= '--nbarBold:' . $theme['nbarBold'] . ';';
    $root .= '--nbarItalic:' . $theme['nbarItalic'] . ';';
    $root .= '--nbarFsize:' . $theme['nbarFsize'] . ';';
    $root .= '--nbarBgHi:' . $theme['nbarBgHi'] . ';';
    $root .= '--nbarFgHi:' . $theme['nbarFgHi'] . ';';
            
    $root .= '--fbarBold:' . $theme['fbarBold'] . ';';
    $root .= '--fbarItalic:' . $theme['fbarItalic'] . ';';
    $root .= '--fbarFsize:' . $theme['fbarFsize'] . ';';
        
    $root .= '--formBg:' . $theme['formBg'] . ';';
    $root .= '--formFg:' . $theme['formFg'] . ';';
    $root .= '--formBorder:' . $theme['formBorder'] . ';';
    $root .= '--formShadow:' . $theme['formShadow'] . ';';
    
    $root .= '--btnH:' . $theme['btnH'] . ';';
    $root .= '--btnBg:' . $theme['btnBg'] . ';';
    $root .= '--btnFg:' . $theme['btnFg'] . ';';
    $root .= '--btnBgHi:' . $theme['btnBgHi'] . ';';
    $root .= '--btnFgHi:' . $theme['btnFgHi'] . ';';
    $root .= '--btnBgDis:' . $theme['btnBgDis'] . ';';
    $root .= '--btnFgDis:' . $theme['btnFgDis'] . ';';
    $root .= '--btnBold:' . $theme['btnBold'] . ';';
    $root .= '--btnItalic:' . $theme['btnItalic'] . ';';
    $root .= '--btnFsize:' . $theme['btnFsize'] . ';';
    $root .= '--btnShadow:' . $theme['btnShadow'] . ';';
    $root .= '--btnBorder:' . $theme['btnBorder'] . ';';
            
    $root .= '--inpH:' . $theme['inpH'] . ';';
    $root .= '--inpBg:' . $theme['inpBg'] . ';';
    $root .= '--inpFg:' . $theme['inpFg'] . ';';
    $root .= '--inpBgHi:' . $theme['inpBgHi'] . ';';
    $root .= '--inpFgHi:' . $theme['inpFgHi'] . ';';
    $root .= '--inpBgDis:' . $theme['inpBgDis'] . ';';
    $root .= '--inpFgDis:' . $theme['inpFgDis'] . ';';
    $root .= '--inpBold:' . $theme['inpBold'] . ';';
    $root .= '--inpItalic:' . $theme['inpItalic'] . ';';
    $root .= '--inpFsize:' . $theme['inpFsize'] . ';';
    $root .= '--inpShadow:' . $theme['inpShadow'] . ';';
    $root .= '--inpBorder:' . $theme['inpBorder'] . ';';

    $root .= '--contentW:' . $theme['contentW'] . ';';
    $root .= '--contentD:' . $theme['contentD'] . ';';
    $root .= '--contBg:' . $theme['contBg'] . ';';
    $root .= '--contFg:' . $theme['contFg'] . ';';
    $root .= '--contBorder:' . $theme['contBorder'] . ';';
    $root .= '--contShadow:' . $theme['contShadow'] . ';';
    $root .= '--markBg:' . $theme['markBg'] . ';';
    $root .= '--markFg:' . $theme['markFg'] . ';';
    $root .= '--markBorder:' . $theme['markBorder'] . ';';
    $root .= '--markShadow:' . $theme['markShadow'] . ';';
    $root .= '--markFsize:' . $theme['markFsize'] . ';';
    $root .= '--markBold:' . $theme['markBold'] . ';';
    $root .= '--markItalic:' . $theme['markItalic'] . ';';

    $pages = db_select($db, 'pages', ['*'], db_where($db, 'id', $pageId));
    if( $pages !== false && gettype($pages) !== 'string' ) {
        $page = $pages[0];
        $root .= '--contentW:' . $page['contentW'] . ';';
        $root .= '--contentD:' . $page['contentD'] . ';';
        $root .= '--contBg:' . $page['contBg'] . ';';
        $root .= '--contFg:' . $page['contFg'] . ';';
        $root .= '--contBorder:' . $page['contBorder'] . ';';
        $root .= '--contShadow:' . $page['contShadow'] . ';';
        $root .= '--markBg:' . $page['markBg'] . ';';
        $root .= '--markFg:' . $page['markFg'] . ';';
        $root .= '--markBorder:' . $page['markBorder'] . ';';
        $root .= '--markShadow:' . $page['markShadow'] . ';';
        $root .= '--markFsize:' . $page['markFsize'] . ';';
        $root .= '--markBold:' . $page['markBold'] . ';';
        $root .= '--markItalic:' . $page['markItalic'] . ';';
    } else {
        $root .= '--contentW:' . $theme['contentW'] . ';';
        $root .= '--contentD:' . $theme['contentD'] . ';';
        $root .= '--contBg:' . $theme['contBg'] . ';';
        $root .= '--contFg:' . $theme['contFg'] . ';';
        $root .= '--contBorder:' . $theme['contBorder'] . ';';
        $root .= '--contShadow:' . $theme['contShadow'] . ';';
        $root .= '--markBg:' . $theme['markBg'] . ';';
        $root .= '--markFg:' . $theme['markFg'] . ';';
        $root .= '--markBorder:' . $theme['markBorder'] . ';';
        $root .= '--markShadow:' . $theme['markShadow'] . ';';
        $root .= '--markFsize:' . $theme['markFsize'] . ';';
        $root .= '--markBold:' . $theme['markBold'] . ';';
        $root .= '--markItalic:' . $theme['markItalic'] . ';';
    }
    
    $root .= '}';
    return '<style>' . $root . '</style>';
    }   