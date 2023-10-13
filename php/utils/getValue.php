<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../utils/load.php';

function getValue(stdClass $args) : Reply {

    return loadForm('utils/html/getvalue', [
        'id' => $args->id,
        'title' => $args->title,
        'label' => $args->label,
        'type' => $args->type,
        'value' => $args->value,
        'apply' => $args->callback
    ]);
}
?>
