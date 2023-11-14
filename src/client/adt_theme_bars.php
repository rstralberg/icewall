<?php

require_once __DIR__ . '/../utils/style.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['barsBg', 'barsFg', 'barsBorder', 'barsShadow'])) {

    
    $border = split_border($args->barsBorder);

    send_resolve( load_form(__DIR__.'/_adt_theme_bars', [
        'barsBg' => $args->barsBg,
        'barsFg' => $args->barsFg,
        'barsBorderColor' => $border->color,
        'barsBorderWidth' => $border->width,
        'barsShadow' =>$args->barsShadow
    ]));
}
