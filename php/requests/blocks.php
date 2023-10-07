<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/../storage/blocks.php';
require_once __DIR__ . '/../storage/pages.php';
require_once __DIR__ . '/../generators/block.php';

function onBlocks(stdClass|null $args) : Reply {

    if( $args === null ) return new Reply('error', 'Argument saknas vid hämtning av block');
    $mysqli = dbConnect();
    $page = selectPage($mysqli, $args->pageId);
    
    $blocks = selectBlocks($mysqli, $args->pageId);
    dbDisonnect($mysqli);

    if( !$blocks ) {
        return new Reply('error', 'Sidan "' . $page['title'] . '" saknar innehåll');
    }
    else {
        $html = '';
        foreach ($blocks as $block) {
            if( $block['public']==='1' || ($args->username && strlen($args->username)>0))
            $html .= generateBlock($block);
        }
        return new Reply('ok', $html);
    }
}
?>