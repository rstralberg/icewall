<?php

require_once __DIR__ . '/../../utils/style.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';


if (verify_client_args($args, ['theme', 'fbarBold', 'fbarItalic', 'fbarFsize'])) {

    $options = '<option ' .($args->fbarFsize==='small'?'selected':''). ' value="small">Liten</options>';
    $options.= '<option ' .($args->fbarFsize==='medium'?'selected':''). ' value="medium">Normal</options>';
    $options.= '<option ' .($args->fbarFsize==='large'?'selected':''). ' value="large">Stor</options>';


    send_resolve( load_form(__DIR__.'/footer', [
        'theme' => $args->theme,
        'fbarBold' => $args->fbarBold==='bold'?'checked':'',
        'fbarItalic' => $args->fbarItalic==='italic'?'checked':'',
        'fbarFsize' => (float)$args->fbarFsize,
        'fontsizes' => $options
    ]));
}
