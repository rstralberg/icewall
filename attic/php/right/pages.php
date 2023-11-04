<?php
require_once __DIR__ . '/../tools/html.php';

function pages():string {
    return loadHTML(__DIR__. '/pages.html');
}


?>
