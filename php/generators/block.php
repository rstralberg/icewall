<?php


function generateBlock( array $block): string  {

    $html = '<section class="block" id="sec-' . $block['id'] . '"'; 
    if( strlen($block['style']) > 0 ) {
        $html .= ' style="' . $block['style'] . '"' ;
    }
    $html.= 'pub="'. ($block['public']==='1'?'true':'false') .'" ';
    $html.= ' onmousedown="onBlockSelect(\'sec-'.$block['id'].'\')">';
    $html.= $block['html'];
    $html.= '</section>';
    return $html;
}
?>

