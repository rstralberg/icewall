<?php

require_once __DIR__ . '/../tools/loadForm.php';

function th_shadows(stdClass $args) : Reply {

    return loadForm('theme/html/shadows', [
        'shNavbar' => $args->shNavbar === '1' ? 'true' : 'false',
        'shTitle' => $args->shTitle === '1' ? 'true' : 'false',
        'shContent' => $args->shContent === '1' ? 'true' : 'false',
        'shFooter' => $args->shFooter === '1' ? 'true' : 'false',
        'shForm' => $args->shForm === '1' ? 'true' : 'false',
        'shButton' => $args->shButton === '1' ? 'true' : 'false',
        'shInput' => $args->shInput === '1' ? 'true' : 'false',
        'shTools' => $args->shTools === '1' ? 'true' : 'false'
    ]);
}
?>
