<?php

require_once __DIR__ . '/../tools/reply.php';
require_once __DIR__ . '/../tools/loadForm.php';

function getValue(stdClass $args) : Reply {

    return loadForm(__DIR__ . '/getvalue', [
        'opt' => $args->opt,
        'title' => $args->title,
        'label' => $args->label,
        'type' => $args->type,
        'value' => $args->value,
        'apply' => $args->callback
    ]);
}
?>
