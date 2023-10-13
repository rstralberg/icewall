<?php

require_once __DIR__ . '/reqrep.php';
require_once __DIR__ . '/html.php';

function loadForm(string $page, array $args = null ) : Reply {

    $loaded = loadHTML(__DIR__. '/' . '../' . $page . '.html', $args);
    if( $loaded ) {
        return new Reply('ok',  compressHTML($loaded));
    }
    else {
        return new Reply('error', 'Kunde inte ladda önskad sida "' . $page . '.html"');
    }
}
