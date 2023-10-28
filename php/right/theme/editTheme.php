<?php
require_once __DIR__ . '/../../tools/loadForm.php';

function editTheme() : Reply {
    return loadForm(__DIR__. '/theme');
}

?>
