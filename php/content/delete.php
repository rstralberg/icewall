<?php

require_once __DIR__ . '/../content/content.php';

function contentDelete(stdClass $args) : Reply {

    $mysqli = dbConnect();

    deleteContent($mysqli, $args->contentId);

    dbDisonnect($mysqli);

    return new Reply('ok', true);
}
?>
