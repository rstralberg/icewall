<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/content.php';
require_once __DIR__ . '/../page/page.php';

function updateContentPositions(stdClass $args) : Reply {

    $myscli = dbConnect();

    for($i = 0; $i < count($args->positions); $i++) {
        $pos = $args->positions[$i];
        updateContent($myscli, ['pos'], [$pos->pos], $pos->id);
    }
    dbDisonnect($myscli);
    return new Reply('ok', true);
}

function updateContentPublic(stdClass $args): Reply {

    $myscli = dbConnect();
    updateContent($myscli, ['public'], [sqlBoolean($args->pub)], $args->id);
    dbDisonnect($myscli);
    return new Reply('ok', true);
}
?>

