<?php

require_once __DIR__ . '/../../utils/style.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['markBg', 'markFg', 'markBorder', 'markShadow','markFsize', 'markBold', 'markItalic'])) {

    
    $options = '<option ' .($args->markFsize==='small'?'selected':''). ' value="small">Liten</options>';
    $options.= '<option ' .($args->markFsize==='medium'?'selected':''). ' value="medium">Normal</options>';
    $options.= '<option ' .($args->markFsize==='large'?'selected':''). ' value="large">Stor</options>';


    $border = split_border($args->markBorder);

    send_resolve( load_form(__DIR__.'/th_mark', [
        'markBg' => $args->markBg,
        'markFg' => $args->markFg,
        'markBorderColor' => $border->color,
        'markBorderWidth' => $border->width,
        'markShadow' =>$args->markShadow?'checked':'',
        'markFsize' => (float)$args->markFsize,
        'markBold' => $args->markBold==='bold'?'checked':'',
        'markItalic' => $args->markItalic==='italic'?'checked':'',
        'fontsizes' => $options
    ]));
}
