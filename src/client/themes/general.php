<?php

require_once __DIR__ . '/../../generate/fonts.php';
require_once __DIR__ . '/../../utils/style.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['theme', 'font', 'headerT', 'headerH', 'footerB', 'footerH', 'titleH', 
    'menuW', 'infoW', 'titleW', 'contentW', 'contentD', 'radius', 'linkFg', 'appBg' ])) {

    $fontnames = get_fontnames();
    $fonts = '';
    $args->font = trim($args->font,'"');
    for($i=0; $i < count($fontnames); $i++) {
        if( $fontnames[$i] === $args->font)
            $fonts .= '<option selected value="'.$fontnames[$i].'">'.$fontnames[$i].'</option>';
        else
            $fonts .= '<option value="'.$fontnames[$i].'">'.$fontnames[$i].'</option>';
    }


    send_resolve( load_form(__DIR__.'/general', [
        'theme' => $args->theme,
        'fonts' => $fonts,
        'font' => $args->font,
        'headerT' => (int)$args->headerT,
        'headerH' => (int)$args->headerH,
        'footerB' => (int)$args->footerB,
        'footerH' => (int)$args->footerH,
        'titleH' => (int)$args->titleH,
        'menuW' => (int)$args->menuW,
        'infoW' => (int)$args->infoW,
        'titleW' => (int)$args->titleW,
        'contentW' => (int)$args->contentW,
        'contentD' => (int)$args->contentD,
        'radius' => (int)$args->radius,
        'linkFg' => $args->linkFg,
        'appBg' => $args->appBg,
    ]));
}
