<?php

require_once __DIR__ . '/../content/content.php';

function contentDelete(stdClass $args) : Reply {

    $db = new db(); 
    $db->open($args->database);

    deleteContent($db, $args->contentId);

    $db->close();

    return new Reply(true, '');
}
?>
