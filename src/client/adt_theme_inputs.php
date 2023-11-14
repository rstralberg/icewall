<?php

require_once __DIR__ . '/../utils/style.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['inpH', 'inpBg', 'inpFg', 'inpBgHi', 'inpFgHi',
'inpBgDis', 'inpFgDis', 'inpBold', 'inpItalic', 'inpFsize', 'inpShadow', 'inpBorder'])) {

    $options = '<option ' .($args->inpFsize==='small'?'selected':''). ' value="small">Liten</options>';
    $options.= '<option ' .($args->inpFsize==='medium'?'selected':''). ' value="medium">Normal</options>';
    $options.= '<option ' .($args->inpFsize==='large'?'selected':''). ' value="large">Stor</options>';

    $border = split_border($args->inpBorder);

    send_resolve( load_form(__DIR__.'/_adt_theme_inputs', [
        'inpH' => (int)$args->inpH,
        'inpBg' => $args->inpBg,
        'inpFg' => $args->inpFg,
        'inpBgHi' => $args->inpBgHi,
        'inpFgHi' => $args->inpFgHi,
        'inpBgDis' => $args->inpBgDis,
        'inpFgDis' => $args->inpFgDis,
        'inpBold' => $args->inpBold==='bold'?'checked':'',
        'inpItalic' => $args->inpItalic==='italic'?'checked':'',
        'inpFsize' => (float)$args->inpFsize,
        'inpShadow' => $args->inpShadow?'checked':'',
        'inpBorderColor' => $border->color,
        'inpBorderWidth' => $border->width,
        'fontsizes' => $options
    ]));
}
