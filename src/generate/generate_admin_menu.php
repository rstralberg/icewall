<?php

function generate_admin_menu() : string {
    
    $html = load_html(__DIR__ . '/adm_page.html');
    $html.= load_html(__DIR__ . '/adm_pages.html');
    $html.= load_html(__DIR__ . '/adm_system.html');
    $html.= load_html(__DIR__ . '/adm_themes.html');

    return $html;
}

?>
