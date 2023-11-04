<?php

require_once __DIR__ . '/../tools/loadForm.php';

function settings()  :string {
    return loadHTML(__DIR__. '/settings.html');
}

?>
