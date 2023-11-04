<?php

require_once __DIR__ . '/reply.php';
require_once __DIR__ . '/html.php';

function load_form(string $form, array $args ) : void {

    $loaded = load_html( $form . '.html', $args);
    if( $loaded ) 
        send_reply(true, compressHTML($loaded));
    else 
        send_reply(false, 'Could not find requested form "' . $form . '.html"');
}
