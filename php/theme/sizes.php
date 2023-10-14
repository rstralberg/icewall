<?php

require_once __DIR__ . '/../utils/load.php';

function th_sizes(stdClass $args) : Reply {

    return loadForm('theme/html/sizes', [
        'wLeft' => $args->wLeft,
        'wCenter' => $args->wCenter,
        'wRight' => $args->wRight,
        'hApp' => $args->hApp,
        'hNavbar' => $args->hNavbar,
        'hFooter' => $args->hFooter,
        'vGap' => $args->vGap,
        'hGap' => $args->hGap,
        'dContent' => $args->dContent,
        'wContent' => $args->wContent,
    ]);

}
?>
