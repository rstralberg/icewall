<?php

require_once __DIR__ . '/../tools/reply.php';
// require_once __DIR__ . '/theme.php';


function themeUpdate(stdClass $args): Reply
{

    // $db = new db();
    // $db->open($args->database);

    // $res = updateTheme($db, $args->theme[0], $args->theme);
    // $lastError = $db->lastError();
    // $db->close();

    // if ($res)
    //     return new Reply(true,'');
    // else
    //     return new Reply(false, $lastError);
        return new Reply(false,'');
    }


?>