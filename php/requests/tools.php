<?php 

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../../html/load.php';

function onTools(stdClass $args) : Reply {
    return load_requested_page('tools', [
        'iconsfolder' => $args->iconsfolder
    ]);
}

?>
