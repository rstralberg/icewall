<?php
require_once __DIR__ . '/add/add.php';
require_once __DIR__ . '/content/content.php';
require_once __DIR__ . '/section/section.php';

function left()  : string {
    return compressHTML(section() . content() . add());
}


?>