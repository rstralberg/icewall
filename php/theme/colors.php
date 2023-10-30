<?php

require_once __DIR__ . '/../tools/loadForm.php';

function th_colors(stdClass $args): Reply
{
    return loadForm('theme/html/colors', [
        'bgApp' => $args->bgApp,
        'fgApp' => $args->fgApp,
        'bgNavbar' => $args->bgNavbar,
        'fgNavbar' => $args->fgNavbar,
        'bgHover' => $args->bgHover,
        'fgHover' => $args->fgHover,
        'bgTitle' => $args->bgTitle,
        'fgTitle' => $args->fgTitle,
        'bgContent' => $args->bgContent,
        'fgContent' => $args->fgContent,
        'bgFooter' => $args->bgFooter,
        'fgFooter' => $args->fgFooter,
        'bgForm' => $args->bgForm,
        'fgForm' => $args->fgForm,
        'bgButton' => $args->bgButton,
        'fgButton' => $args->fgButton,
        'bgInput' => $args->bgInput,
        'fgInput' => $args->fgInput,
        'bgTools' => $args->bgTools,
        'fgTools' => $args->fgTools,

    ]);
}
?>