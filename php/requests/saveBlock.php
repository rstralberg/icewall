<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/blocks.php';
require_once __DIR__ . '/../generators/block.php';

function onSaveBlock( stdClass $args ) : Reply {

    $mysqli = dbConnect();
    
    $block = null;
    $blocks = selectBlock($mysqli, $args->id);
    if( $blocks ) {
        $block = $blocks[0];
        $block['style'] = sqlString($mysqli,$args->style);
        $block['html'] = sqlString($mysqli,$args->html);
        $block['public'] = sqlBoolean($args->pub);
        if( !updateBlock($mysqli, $args->id, $block) ) {
            dbDisonnect($mysqli);
            return new Reply( 'error', 'Kunde inte spara avsnittet: ' .  mysqli_error($mysqli) );
        }
    }
    else {
        $block['pageId'] = $args->pageId;
        $block['style'] = sqlString($mysqli,$args->style);
        $block['html'] = sqlString($mysqli,$args->html);
        $block['pos'] = $args->pos;
        $block['public'] = sqlBoolean($args->pub);
        $block['id'] = insertBlock($mysqli, $block);
        if( $block['id'] < 1 ) {
            dbDisonnect($mysqli);
            return new Reply( 'error', 'Kunde inte spara avsnittet: ' .  mysqli_error($mysqli) );
        }
    }   

    dbDisonnect($mysqli);
    return new Reply('ok', generateBlock($block));

}
?>