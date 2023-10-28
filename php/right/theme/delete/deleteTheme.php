<?php

require_once __DIR__ . '/../../../tools/loadForm.php';

function deleteTheme(stdClass $args): Reply
{
    return loadForm(__DIR__ . '/deleteTheme', );
}


?>