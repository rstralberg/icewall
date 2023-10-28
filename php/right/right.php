<?php
require_once __DIR__ . '/page.php';
require_once __DIR__ . '/pages.php';
require_once __DIR__ . '/settings.php';
require_once __DIR__ . '/theme.php';

function right()  : string {
    return compressHTML(page() . pages() . settings() . theme());
}


?>