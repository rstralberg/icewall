<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../../html/load.php';

function onGetVAlue(stdClass $args) : Reply {

    return load_requested_page('getvalue', [
        'id' => $args->id,
        'title' => $args->title,
        'label' => $args->label,
        'type' => $args->type,
        'value' => $args->value,
        'apply' => $args->callback
    ]);
}
?>
