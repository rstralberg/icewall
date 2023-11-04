<?php

require_once __DIR__ . '/html.php';

function loadForm(string $form, array $args ) : void {

    $loaded = loadHTML( $form . '.html', $args);
    if( $loaded ) 
        sendReply(true, compressHTML($loaded));
    else 
        sendReply(false, 'Could not find requested form "' . $form . '.html"');
}
