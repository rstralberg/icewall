<?php

require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/theme.php';


function saveThemeAs( stdClass $args ) : Reply {
    
    return loadForm(__DIR__ . '/saveAs');
}
?>
