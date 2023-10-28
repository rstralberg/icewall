<?php

require_once __DIR__ . '/reply.php';
require_once __DIR__ . '/html.php';

function loadForm(string $page, array $args = null ) : Reply {

    $loaded = loadHTML( $page . '.html', $args);
    if( $loaded ) {
        return new Reply(true, compressHTML($loaded));
    }
    else {
        return new Reply(false, 'Kunde inte ladda önskad sida "' . $page . '.html"');
    }
}
