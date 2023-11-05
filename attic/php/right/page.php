<?php
require_once __DIR__ . '/../tools/load_html.php';

function page(): string
{
    return loadHTML(__DIR__ . '/page.html');
}


?>