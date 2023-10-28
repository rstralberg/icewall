<?php

require_once __DIR__ . '/../../../tools/reply.php';

function saveTheme(stdClass $args) : Reply {

    return loadForm(__DIR__ . '/saveTheme');

}
function saveThemeAs(stdClass $args) : Reply {

    return loadForm(__DIR__ . '/saveThemeAs');

}

?>
