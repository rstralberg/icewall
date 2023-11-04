<?php

require_once __DIR__ . '/../tools/loadForm.php';


function th_borders(stdClass $args): Reply
{
        return loadForm('theme/html/borders', [
        'bdColNavbar' => $args->bdColNavbar,
        'bdSizeNavbar' => $args->bdSizeNavbar,
        'rNavbar' => $args->rNavbar,
        'bdColTitle' => $args->bdColTitle,
        'bdSizeTitle' => $args->bdSizeTitle,
        'rTitle' => $args->rTitle,
        'bdColContent' => $args->bdColContent,
        'bdSizeContent' => $args->bdSizeContent,
        'rContent' => $args->rContent,
        'bdColFooter' => $args->bdColFooter,
        'bdSizeFooter' => $args->bdSizeFooter,
        'rFooter' => $args->rFooter,
        'bdColForm' => $args->bdColForm,
        'bdSizeForm' => $args->bdSizeForm,
        'rForm' => $args->rForm,
        'bdColButton' => $args->bdColButton,
        'bdSizeButton' => $args->bdSizeButton,
        'rButton' => $args->rButton,
        'bdColInput' => $args->bdColInput,
        'bdSizeInput' => $args->bdSizeInput,
        'rInput' => $args->rInput,
        'bdColTools' => $args->bdColTools,
        'bdSizeTools' => $args->bdSizeTools,
        'rTools' => $args->rTools,
    ]);

}

?>