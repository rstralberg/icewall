<?php

function admin_menu() : string {
    
    $html = load_html(__DIR__ . '/page.html');
    $html.= load_html(__DIR__ . '/pages.html');
    $html.= load_html(__DIR__ . '/system.html');
    $html.= load_html(__DIR__ . '/themes.html');

    return $html;
}

?>
