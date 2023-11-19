<?php

require_once __DIR__ . '/../../utils/style.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['theme', 'formBg', 'formFg', 'formBorder', 'formShadow'])) {

    $border = split_border($args->formBorder);

    send_resolve( load_form(__DIR__.'/forms', [
        'theme' => $args->theme,
        'formBg' => $args->formBg,
        'formFg' => $args->formFg,
        'formBorderColor' => $border->color,
        'formBorderWidth' => $border->width,
        'formShadow' => $args->formShadow?'checked':''
        ]));
}
