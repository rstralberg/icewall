<?php

require_once __DIR__ . '/../generate/generate_fonts.php';
require_once __DIR__ . '/../utils/style.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';


if (verify_client_args($args, ['tbarH', 'tbarBold', 'tbarItalic', 'tbarFsize'])) {

    $options = '<option ' .($args->tbarFsize==='small'?'selected':''). ' value="small">Liten</options>';
    $options.= '<option ' .($args->tbarFsize==='medium'?'selected':''). ' value="medium">Normal</options>';
    $options.= '<option ' .($args->tbarFsize==='large'?'selected':''). ' value="large">Stor</options>';

    send_resolve( load_form(__DIR__.'/_adt_theme_titlebar', [
        'tbarH' => (int)$args->tbarH,
        'tbarBold' => $args->tbarBold==='bold'? 'checked':'',
        'tbarItalic' => $args->tbarItalic==='italic'?'checked':'',
        'fontsizes' => $options
    ]));
}
