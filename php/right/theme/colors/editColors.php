<?php

require_once __DIR__ . '/../../../tools/reply.php';
require_once __DIR__ . '/../../../tools/loadForm.php';

function editColors(stdClass $args): Reply
{
    return loadForm(__DIR__ . '/editColors');
}

