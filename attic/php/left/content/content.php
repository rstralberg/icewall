<?php

require_once __DIR__ . '/../../tools/load_html.php';


function content() : string {
    return loadHTML(__DIR__. '/content.html');
}



?>