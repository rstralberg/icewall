<?php

require_once __DIR__ . '/../../../tools/loadForm.php';

function editFonts(stdClass $args) : Reply {

    return loadForm(__DIR__ . '/editFonts');
}
?>
