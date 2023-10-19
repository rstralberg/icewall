<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/content.php';
require_once __DIR__ . '/../page/page.php';

function updateContentPositions(stdClass $args) : Reply {

    $db = new Db($args->database); 
    $db->open();

    for($i = 0; $i < count($args->positions); $i++) {
        $pos = $args->positions[$i];
        updateContent($db, ['pos'], [$pos->pos], $pos->id);
    }
    $db->close();
    return new Reply(true, '');
}

function updateContentPublic(stdClass $args): Reply {

    $db = new Db($args->database); 
    $db->open();
    updateContent($db, ['public'], [$db->bool($args->pub)], $args->id);
    $db->close();
    return new Reply(true,'');
}
?>

