<?php

require_once __DIR__ . '/../utils/style.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['contBg', 'contFg', 'contBorder', 'contShadow'])) {

    $border = split_border($args->contBorder);

    send_resolve( load_form(__DIR__.'/_adt_theme_content', [
        'contBg' => $args->contBg,
        'contFg' => $args->contFg,
        'contBorderColor' => $border->color,
        'contBorderWidth' => $border->width,
        'contShadow' => $args->contShadow?'checked':''
        ]));
}
