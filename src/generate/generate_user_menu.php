<?php

function generate_user_menu() : string {
    
    $html = load_html(__DIR__ . '/usr_section.html');
    $html.= load_html(__DIR__ . '/usr_content.html');
    $html.= load_html(__DIR__ . '/usr_add.html');

    return $html;
}

?>
