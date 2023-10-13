<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../storage/blocks.php';

function onSaveNewPage($args) {

    $mysqli = dbConnect();

    $page =  [
        sqlString($mysqli, $args->title),
        $args->parentId,
        sqlBoolean($args->isParent),
        sqlString($mysqli, $args->author),
        sqlBoolean($args->showTitle),
        $args->pos,
        sqlBoolean($args->public) ];

    $page['id'] = insertPage($mysqli, $page );
    
    dbDisonnect($mysqli);

    return new Reply(((int)$page['id'])>0?'ok':'error', json_encode($page) );
}

?>
