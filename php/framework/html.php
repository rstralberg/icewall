<?php
require_once __DIR__ . '/head.php';
require_once __DIR__ . '/../page/page.php';
require_once __DIR__ . '/../utils/html.php';

function generateHTML(Db $cli, string $sitekey, string $sitefolder, string $sitedb, string $siteName ) : string {

    $pageId = getFirstPageId($cli);
    
    $html = '<!DOCTYPE html><html lang="sv">';
    $html.= generateHead($cli, $siteName, DEFAULT_THEME);

    $html.= '<body>';
    $html.= '<div class="container">';
    $html.= '<div class="title"></div>';
    $html.= '<div class="navbar"></div>';
    $html.= '<div class="content"></div>';
    $html.= '<div class="footer"></div>';
    $html.= '<div class="right">'.loadHTML(__DIR__ . '/html/right.html').'</div>';
    $html.= '<div class="left">'.loadHTML(__DIR__ . '/html/left.html').'</div>';
    $html.= '</div>' ;
    $html.= '</body>';
    
    // Jscript loading ....
    $html.= '<script type="module"> 
                addEventListener("DOMContentLoaded", (event) => { index('. 
                    $pageId . ',"' . 
                    $sitekey .'","' . 
                    'sites/' . $sitefolder .'","' . 
                    $sitedb .'","' . 
                    $siteName .'");})
            </script>';

    return compressHTML($html . '</html>');
}
?>