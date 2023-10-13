<?php 

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../utils/load.php';

function leftTools(stdClass $args) : Reply {
    return loadForm('framework/html/left', [
        'iconsfolder' => $args->iconsfolder
    ]);
}

?>
