<?php

require_once __DIR__ . '/../../../tools/loadForm.php';

function editBorders(stdClass $args): Reply
{
        return loadForm(__DIR__ . '/editBorders');

}

?>