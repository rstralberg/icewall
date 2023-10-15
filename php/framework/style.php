<?php
require_once __DIR__ . '/../theme/theme.php';
require_once __DIR__ . '/../page/pagetheme.php';

function generateStyle(Db $db, string $themeName): string
{

    $themes = selectTheme($db, $themeName);
    if (count($themes) === 0) {
        throw new Exception('Kunde inte ladda applikationens tema ' . $themeName);
    }

    $pagestyles = selectPageTheme($db, 'Standard');
    if (count($pagestyles) === 0) {
        throw new Exception('Kunde inte ladda sidans temma ' . 'Standard');
    }
    $pagestyle = $pagestyles[0];

    $theme = $themes[0];

    $root = ':root {';

    $root .= '--name:' . $theme['name'] . ';';
    $root .= '--wLeft:' . $theme['wLeft'] . 'fr;';
    $root .= '--wCenter:' . $theme['wCenter'] . 'fr;';
    $root .= '--wRight:' . $theme['wRight'] . 'fr;';

    $root .= '--vGap:' . $theme['vGap'] . 'px;';
    $root .= '--hGap:' . $theme['hGap'] . 'px;';

    $root .= '--hApp:' . $theme['hApp'] . 'vh;';
    $root .= '--hNavbar:' . $theme['hNavbar'] . 'fr;';
    $root .= '--hTitle:' . $theme['hTitle'] . 'fr;';
    $root .= '--hFooter:' . $theme['hFooter'] . 'fr;';
    $root .= '--dContent:' . $theme['dContent'] . 'vh;';

    $root .= '--rNavbar:' . $theme['rNavbar'] . 'px;';
    $root .= '--rTitle:' . $theme['rTitle'] . 'px;';
    $root .= '--rContent:' . $theme['rContent'] . 'px;';
    $root .= '--rFooter:' . $theme['rFooter'] . 'px;';
    $root .= '--rForm:' . $theme['rForm'] . 'px;';
    $root .= '--rInput:' . $theme['rInput'] . 'px;';
    $root .= '--rTools:' . $theme['rTools'] . 'px;';
    $root .= '--rButton:' . $theme['rButton'] . 'px;';

    $root .= '--shNavbar:' . $theme['shNavbar'] . ';';
    $root .= '--shTitle:' . $theme['shTitle'] . ';';
    $root .= '--shContent:' . $theme['shContent'] . ';';
    $root .= '--shFooter:' . $theme['shFooter'] . ';';
    $root .= '--shForm:' . $theme['shForm'] . ';';
    $root .= '--shButton:' . $theme['shButton'] . ';';
    $root .= '--shInput:' . $theme['shInput'] . ';';
    $root .= '--shTools:' . $theme['shTools'] . ';';

    $root .= '--bdColNavbar:' . $theme['bdColNavbar'] . ';';
    $root .= '--bdColTitle:' . $theme['bdColTitle'] . ';';
    $root .= '--bdColContent:' . $theme['bdColContent'] . ';';
    $root .= '--bdColFooter:' . $theme['bdColFooter'] . ';';
    $root .= '--bdColForm:' . $theme['bdColForm'] . ';';
    $root .= '--bdColButton:' . $theme['bdColButton'] . ';';
    $root .= '--bdColInput:' . $theme['bdColInput'] . ';';
    $root .= '--bdColTools:' . $theme['bdColTools'] . ';';
    
    $root .= '--bdSizeNavbar:' . $theme['bdSizeNavbar'] . 'px;';
    $root .= '--bdSizeTitle:' . $theme['bdSizeTitle'] . 'px;';
    $root .= '--bdSizeFooter:' . $theme['bdSizeFooter'] . 'px;';
    $root .= '--bdSizeForm:' . $theme['bdSizeForm'] . 'px;';
    $root .= '--bdSizeButton:' . $theme['bdSizeButton'] . 'px;';
    $root .= '--bdSizeInput:' . $theme['bdSizeButton'] . 'px;';
    $root .= '--bdSizeTools:' . $theme['bdSizeTools'] . 'px;';

    $root .= '--bgApp:' . $theme['bgApp'] . ';';
    $root .= '--bgNavbar:' . $theme['bgNavbar'] . ';';
    $root .= '--bgTitle:' . $theme['bgTitle'] . ';';
    $root .= '--bgContent:' . $theme['bgContent'] . ';';
    $root .= '--bgFooter:' . $theme['bgFooter'] . ';';
    $root .= '--bgForm:' . $theme['bgForm'] . ';';
    $root .= '--bgButton:' . $theme['bgButton'] . ';';
    $root .= '--bgInput:' . $theme['bgInput'] . ';';
    $root .= '--bgHover:' . $theme['bgHover'] . ';';
    $root .= '--bgTools:' . $theme['bgTools'] . ';';

    $root .= '--fgApp:' . $theme['fgApp'] . ';';
    $root .= '--fgNavbar:' . $theme['fgNavbar'] . ';';
    $root .= '--fgTitle:' . $theme['fgTitle'] . ';';
    $root .= '--fgContent:' . $theme['fgContent'] . ';';
    $root .= '--fgFooter:' . $theme['fgFooter'] . ';';
    $root .= '--fgForm:' . $theme['fgForm'] . ';';
    $root .= '--fgButton:' . $theme['fgButton'] . ';';
    $root .= '--fgInput:' . $theme['fgInput'] . ';';
    $root .= '--fgHover:' . $theme['fgHover'] . ';';
    $root .= '--fgTools:' . $theme['fgTools'] . ';';

    $root .= '--fzNavbar:' . $theme['fzNavbar'] . 'em;';
    $root .= '--fzTitle:' . $theme['fzTitle'] . 'em;';
    $root .= '--fzContent:' . $theme['fzContent'] . 'em;';
    $root .= '--fzFooter:' . $theme['fzFooter'] . 'em;';
    $root .= '--fzForm:' . $theme['fzForm'] . 'em;';
    $root .= '--fzButton:' . $theme['fzButton'] . 'em;';
    $root .= '--fzInput:' . $theme['fzInput'] . 'em;';
    $root .= '--fzTools:' . $theme['fzTools'] . 'em;';
    
    $root .= '--fwNavbar:' . $theme['fwNavbar'] . ';';
    $root .= '--fwTitle:' . $theme['fwTitle'] . ';';
    $root .= '--fwContent:' . $theme['fwContent'] . ';';
    $root .= '--fwFooter:' . $theme['fwFooter'] . ';';
    $root .= '--fwForm:' . $theme['fwForm'] . ';';
    $root .= '--fwButton:' . $theme['fwButton'] . ';';
    $root .= '--fwInput:' . $theme['fwInput'] . ';';
    $root .= '--fwTools:' . $theme['fwTools'] . ';';
    
    $root .= '--fsNavbar:' . $theme['fsNavbar'] . ';';
    $root .= '--fsTitle:' . $theme['fsTitle'] . ';';
    $root .= '--fsContent:' . $theme['fsContent'] . ';';
    $root .= '--fsFooter:' . $theme['fsFooter'] . ';';
    $root .= '--fsForm:' . $theme['fsForm'] . ';';
    $root .= '--fsButton:' . $theme['fsButton'] . ';';
    $root .= '--fsInput:' . $theme['fsInput'] . ';';
    $root .= '--fsTools:' . $theme['fsTools'] . ';';

    $root .= '--font:' . $theme['font'] . ';';
    $root .= '--fontsize:' . $theme['fontsize'] . 'em;';
    $root .= '--iconsfolder:' . $theme['iconsfolder'] . ';';

    $root .= '--pageTheme:' . $pagestyle['name'] . ';';
    $root .= '--wContent:' . $pagestyle['wContent'] . '%;';
    $root .= '--rContent:' . $pagestyle['rContent'] . 'px;';
    $root .= '--shContent:' . $pagestyle['shContent'] . ';';
    $root .= '--bdColContent:' . $pagestyle['bdColContent'] . ';';
    $root .= '--bdSizeContent:' . $pagestyle['bdSizeContent'] . 'px;';
    $root .= '--bgContent:' . $pagestyle['bgContent'] . ';';
    $root .= '--fgContent:' . $pagestyle['fgContent'] . ';';
    $root .= '--fzContent:' . $pagestyle['fzContent'] . 'em;';
    $root .= '--dContent:' . $pagestyle['dContent'] . 'vh;';

    $root .= '}';
    return '<style>' . $root . '</style>';
}