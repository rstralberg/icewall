<?php

require_once __DIR__ . '/../../generate/generate_fonts.php';
require_once __DIR__ . '/../../utils/style.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';


if (verify_client_args($args, ['nbarH','nbarBold','nbarItalic','nbarFsize','nbarBgHi','nbarFgHi'])) {

    $options = '<option ' .($args->nbarFsize==='small'?'selected':''). ' value="small">Liten</options>';
    $options.= '<option ' .($args->nbarFsize==='medium'?'selected':''). ' value="medium">Normal</options>';
    $options.= '<option ' .($args->nbarFsize==='large'?'selected':''). ' value="large">Stor</options>';

    send_resolve( load_form(__DIR__.'/th_menu', [
        'nbarH' => (int)$args->nbarH,
        'nbarBold' => $args->nbarBold==='bold'?'checked':'',
        'nbarItalic' => $args->nbarItalic==='italic'?'checked':'',
        'nbarFsize' => (float)$args->nbarFsize,
        'nbarBgHi' => $args->nbarBgHi,
        'nbarFgHi' => $args->nbarFgHi,
        'fontsizes' => $options
    ]));
}
