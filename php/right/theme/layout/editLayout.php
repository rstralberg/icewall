<?php

require_once __DIR__ . '/../../../tools/loadForm.php';

function editLayout(stdClass $args) : Reply {

    return loadForm(__DIR__ . '/editLayout');

}
?>
