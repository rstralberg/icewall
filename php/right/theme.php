<?php
require_once __DIR__ . '/../tools/html.php';

function theme():string {
    return loadHTML(__DIR__. '/theme.html');
}


?>
