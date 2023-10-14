<?php

require_once __DIR__ . '/../utils/load.php';

function th_fonts(stdClass $args) : Reply {

    $fonts = '';
    $fontnames = getFontNames();
    for($i=0; $i < count($fontnames); $i++) {
        if( $fontnames[$i] === $args->font )
        $fonts .= '<option selected value="'.$fontnames[$i].'">'.$fontnames[$i].'</option>';
        else
        $fonts .= '<option value="'.$fontnames[$i].'">'.$fontnames[$i].'</option>';
    }

    return loadForm('theme/html/fonts', [
        'fonts' => $fonts,
        'fontsize' => $args->fontsize,
        'fzNavbar' => $args->fzNavbar,
        'fsNavbar' => $args->fsNavbar,
        'fwNavbar' => $args->fwNavbar,
        'fzTitle' => $args->fzTitle,
        'fwTitle' => $args->fwTitle,
        'fsTitle' => $args->fsTitle,
        'fzContent' => $args->fzContent,
        'fwContent' => $args->fwContent,
        'fsContent' => $args->fsContent,
        'fzFooter' => $args->fzFooter,
        'fwFooter' => $args->fwFooter,
        'fsFooter' => $args->fsFooter,
        'fzForm' => $args->fzForm,
        'fwForm' => $args->fwForm,
        'fsForm' => $args->fsForm,
        'fzButton' => $args->fzButton,
        'fwButton' => $args->fwButton,
        'fsButton' => $args->fsButton,
        'fzInput' => $args->fzInput,
        'fwInput' => $args->fwInput,
        'fsInput' => $args->fsInput,
        'fzTools' => $args->fzTools,
        'fwTools' => $args->fwTools,
        'fsTools' => $args->fsTools,
    ]);
}
?>
