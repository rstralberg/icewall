<?php
require_once __DIR__ . '/../tools/load_html.php';

function pages():string {
    return loadHTML(__DIR__. '/pages.html');
}


?>
