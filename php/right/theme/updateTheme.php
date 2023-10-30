<?php

require_once __DIR__ . '/../../tools/reply.php';



function updateTheme(stdClass $args): Reply
{

    $db = new db();
    $db->open($args->database);

    // $res = updateTheme($db, $args->theme[0], $args->theme);
    $res = null;
    $lastError = $db->lastError();
    $db->close();

    if ($res)
        return new Reply(true,'');
    else
        return new Reply(false, '#' . $lastError);
}


?>