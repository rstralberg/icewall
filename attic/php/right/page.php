<?php
require_once __DIR__ . '/../tools/html.php';

function page(): string
{
    return loadHTML(__DIR__ . '/page.html');
}


?>