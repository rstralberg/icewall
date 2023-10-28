<?php
require_once __DIR__ . '/head.php';
require_once __DIR__ . '/../tools/html.php';
require_once __DIR__ . '/../left/left.php';
require_once __DIR__ . '/../right/right.php';

function html(Db $db, string $sitekey, string $siteName) : string {

    $ids =  $db->select('page', ['id'], null, $db->name('pos').' asc', 'limit 1');
    $pageId = $ids[0]['id'];
    
    $html = '<!DOCTYPE html><html lang="sv">';
    $html.= head($db, $pageId, $siteName, DEFAULT_THEME);

    $html.= '<body>';
    $html.= '<div class="main">';
    $html.= '<div class="top"></div>';
    $html.= '<div class="sub"></div>';
    $html.= '<div class="center"></div>';
    $html.= '<div class="left">'.left().'</div>';
    $html.= '<div class="right">'.right().'</div>';
    $html.= '<div class="bottom"></div>';
    $html.= '</div>' ;
    $html.= '</body>';
    
    // Jscript loading ....
    $html.= '<script type="module"> 
                addEventListener("DOMContentLoaded", (event) => { index('. 
                    $pageId . ',"' . 
                    $sitekey .'","' . 
                    $siteName .'");})
            </script>';

    return compressHTML($html . '</html>');
}

function compressHTML(string $html): string {
    $res = preg_replace('/\s+/', ' ', $html);
    $res = preg_replace('/\s*<\s*/', '<', $res);
    $res = preg_replace('/\s*>\s*/', '>', $res);
    return $res;
}

function loadHTML(string $htmlFile, array $args = null, string $tag = '$'): string | bool
{
    $fh = fopen($htmlFile, 'r');
    if ($fh) {
        $html = fread($fh, 32000);
        fclose($fh);

        if ($html) {
            $html = compressHTML($html);
            if ($args !== null) {
                foreach ($args as $key => $value) {
                    $html = replace($html, $tag . '{' . $key . '}', $value==='null'||$value===null?'':$value);
                }
            }
            return $html;
        }
    }
    return false;
}

?>