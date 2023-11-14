<?php

require_once __DIR__ . '/../utils/style.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['btnH', 'btnBg', 'btnFg', 'btnBgHi', 'btnFgHi',
'btnBgDis', 'btnFgDis', 'btnBold', 'btnItalic', 'btnFsize', 'btnShadow', 'btnBorder'])) {

    $options = '<option ' .($args->btnFsize==='small'?'selected':''). ' value="small">Liten</options>';
    $options.= '<option ' .($args->btnFsize==='medium'?'selected':''). ' value="medium">Normal</options>';
    $options.= '<option ' .($args->btnFsize==='large'?'selected':''). ' value="large">Stor</options>';

    $border = split_border($args->btnBorder);

    send_resolve( load_form(__DIR__.'/_adt_theme_buttons', [
        'btnH' => (int)$args->btnH,
        'btnBg' => $args->btnBg,
        'btnFg' => $args->btnFg,
        'btnBgHi' => $args->btnBgHi,
        'btnFgHi' => $args->btnFgHi,
        'btnBgDis' => $args->btnBgDis,
        'btnFgDis' => $args->btnFgDis,
        'btnBold' => $args->btnBold?'bold':'normal',
        'btnItalic' => $args->btnItalic?'italic':'normal',
        'btnFsize' => (float)$args->btnFsize,
        'btnShadow' => $args->btnShadow?'checked':'',
        'btnBorderColor' => $border->color,
        'btnBorderWidth' => $border->width,
        'fontsizes' => $options
    ]));
}
