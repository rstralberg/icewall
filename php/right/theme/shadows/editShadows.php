<?php

require_once __DIR__ . '/../../../tools/loadForm.php';

function editShadows(stdClass $args) : Reply {

    return loadForm(__DIR__ . '/editShadows');
}
?>
