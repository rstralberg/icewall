<?php
require_once __DIR__ . '/../tools/load_html.php';

function theme():string {
    return loadHTML(__DIR__. '/theme.html');
}


?>
