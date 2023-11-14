<?php

require_once __DIR__ . '/../generate/generate_fonts.php';
require_once __DIR__ . '/../utils/style.php';
require_once __DIR__ . '/../utils/load_form.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/verify_client_args.php';

if (verify_client_args($args, ['font','left','width','vGap','radius','linkFg','appBg',])) {

    $fontnames = get_fontnames();
    $fonts = '';
    $args->font = trim($args->font,'"');
    for($i=0; $i < count($fontnames); $i++) {
        if( $fontnames[$i] === $args->font)
            $fonts .= '<option selected value="'.$fontnames[$i].'">'.$fontnames[$i].'</option>';
        else
            $fonts .= '<option value="'.$fontnames[$i].'">'.$fontnames[$i].'</option>';
    }


    send_resolve( load_form(__DIR__.'/_adt_theme_general', [
        'fonts' => $fonts,
        'font' => $args->font, 
        'left' => (int)$args->left, 
        'width' => (int)$args->width, 
        'vGap' => (int)$args->vGap, 
        'radius' => (int)$args->radius, 
        'linkFg' => $args->linkFg, 
        'appBg' => $args->appBg
    ]));
}
