<?php

require_once __DIR__ . '/../../utils/style.php';
require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['contentW', 'contentD','contBg','contFg','contBorder',
    'contShadow','markBg','markFg','markBorder','markShadow','markFsize','markBold','markItalic' ])) {

    $fontsizes = '<option ' .($args->markFsize==='small'?'selected':''). ' value="small">Liten</options>';
    $fontsizes.= '<option ' .($args->markFsize==='medium'?'selected':''). ' value="medium">Normal</options>';
    $fontsizes.= '<option ' .($args->markFsize==='large'?'selected':''). ' value="large">Stor</options>';
    
    $contBorder = split_border($args->contBorder);
    $markBorder = split_border($args->markBorder);

    send_resolve( load_form(__DIR__.'/page', [
        'fontsizes' => $fontsizes,
        'contentW' => (int)$args->contentW,
        'contentD' => (int)$args->contentD,
        'contBg' => $args->contBg,
        'contFg' => $args->contFg,
        'contBorderColor' => $contBorder->color,
        'contBorderWidth' => $contBorder->width,
        'contShadow' => $args->contShadow ? 'checked':'',
        'markBg' => $args->markBg,
        'markFg' => $args->markFg,
        'markBorderColor' => $markBorder->color,
        'markBorderWidth' => $markBorder->width,
        'markShadow' => $args->markShadow ? 'checked':'',
        'markFsize' => (int)$args->markFsize,
        'markBold' => $args->markBold ? 'checked':'',
        'markItalic' => $args->markItalic ? 'checked':''
    ]));
}
