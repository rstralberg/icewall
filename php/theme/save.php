<?php

require_once __DIR__ . '/../utils/reqrep.php';
require_once __DIR__ . '/theme.php';

function saveTheme($args) {

    $db = new Db($args->database); 
    $db->open();

    $themes = selectTheme($db, $args->themeName);
    if( !$themes ) {
        $id = insertTheme($db, [
            $db->string($args->themeName),
            $db->string($args->theme->appBg),
            $db->string($args->theme->appFg),
            $db->string($args->theme->appFont),
            $db->string($args->theme->appFsize),
            $db->string($args->theme->appWidth),
            $db->string($args->theme->appRadius),
            $db->string($args->theme->appFolder),
            $db->string($args->theme->editBg),
            $db->string($args->theme->editFg),
            $db->string($args->theme->editActBg),
            $db->string($args->theme->editActFg),
            $db->string($args->theme->editBdFg),
            $db->string($args->theme->editBdW),
            $db->string($args->theme->toolBg),
            $db->string($args->theme->toolFg),
            $db->string($args->theme->toolActBg),
            $db->string($args->theme->toolActFg),
            $db->string($args->theme->toolBdFg),
            $db->string($args->theme->toolBdW),
            $db->string($args->theme->toolShadow),
            $db->string($args->theme->titleBg),
            $db->string($args->theme->titleFg),
            $db->string($args->theme->titleBdFg),
            $db->string($args->theme->titleBdW),
            $db->string($args->theme->titleShadow),
            $db->string($args->theme->barBg),
            $db->string($args->theme->barFg),
            $db->string($args->theme->barActBg),
            $db->string($args->theme->barActFg),
            $db->string($args->theme->barBdFg),
            $db->string($args->theme->barBdW),
            $db->string($args->theme->barShadow),
            $db->string($args->theme->contentBg),
            $db->string($args->theme->contentFg),
            $db->string($args->theme->contentActBg),
            $db->string($args->theme->contentActFg),
            $db->string($args->theme->contentBdFg),
            $db->string($args->theme->contentBdW),
            $db->string($args->theme->contentShadow),
            $db->string($args->theme->formBg),
            $db->string($args->theme->formFg),
            $db->string($args->theme->formBdFg),
            $db->string($args->theme->formBdW),
            $db->string($args->theme->formShadow),
            $db->string($args->theme->btnBg),
            $db->string($args->theme->btnFg),
            $db->string($args->theme->btnActBg),
            $db->string($args->theme->btnActFg),
            $db->string($args->theme->btnBdFg),
            $db->string($args->theme->btnBdW),
            $db->string($args->theme->btnShadow),
            $db->string($args->theme->inpBg),
            $db->string($args->theme->inpFg),
            $db->string($args->theme->inpActBg),
            $db->string($args->theme->inpActFg),
            $db->string($args->theme->inpBdFg),
            $db->string($args->theme->inpBdW),
            $db->string($args->theme->inpShadow),
            $db->string($args->theme->linkBg),
            $db->string($args->theme->linkFg),
            $db->string($args->theme->linkActBg),
            $db->string($args->theme->linkActFg)
        ]);
        $db->close();
        return new Reply($id>0?'ok':'error', $id > 0 );
    }
    else {
        $result = updateTheme($db, $args->themeName, [
            $db->string($args->theme->appBg),
            $db->string($args->theme->appFg),
            $db->string($args->theme->appFont),
            $db->string($args->theme->appFsize),
            $db->string($args->theme->appWidth),
            $db->string($args->theme->appRadius),
            $db->string($args->theme->appFolder),
            $db->string($args->theme->editBg),
            $db->string($args->theme->editFg),
            $db->string($args->theme->editActBg),
            $db->string($args->theme->editActFg),
            $db->string($args->theme->editBdFg),
            $db->string($args->theme->editBdW),
            $db->string($args->theme->toolBg),
            $db->string($args->theme->toolFg),
            $db->string($args->theme->toolActBg),
            $db->string($args->theme->toolActFg),
            $db->string($args->theme->toolBdFg),
            $db->string($args->theme->toolBdW),
            $db->string($args->theme->toolShadow),
            $db->string($args->theme->titleBg),
            $db->string($args->theme->titleFg),
            $db->string($args->theme->titleBdFg),
            $db->string($args->theme->titleBdW),
            $db->string($args->theme->titleShadow),
            $db->string($args->theme->barBg),
            $db->string($args->theme->barFg),
            $db->string($args->theme->barActBg),
            $db->string($args->theme->barActFg),
            $db->string($args->theme->barBdFg),
            $db->string($args->theme->barBdW),
            $db->string($args->theme->barShadow),
            $db->string($args->theme->contentBg),
            $db->string($args->theme->contentFg),
            $db->string($args->theme->contentActBg),
            $db->string($args->theme->contentActFg),
            $db->string($args->theme->contentBdFg),
            $db->string($args->theme->contentBdW),
            $db->string($args->theme->contentShadow),
            $db->string($args->theme->formBg),
            $db->string($args->theme->formFg),
            $db->string($args->theme->formBdFg),
            $db->string($args->theme->formBdW),
            $db->string($args->theme->formShadow),
            $db->string($args->theme->btnBg),
            $db->string($args->theme->btnFg),
            $db->string($args->theme->btnActBg),
            $db->string($args->theme->btnActFg),
            $db->string($args->theme->btnBdFg),
            $db->string($args->theme->btnBdW),
            $db->string($args->theme->btnShadow),
            $db->string($args->theme->inpBg),
            $db->string($args->theme->inpFg),
            $db->string($args->theme->inpActBg),
            $db->string($args->theme->inpActFg),
            $db->string($args->theme->inpBdFg),
            $db->string($args->theme->inpBdW),
            $db->string($args->theme->inpShadow),
            $db->string($args->theme->linkBg),
            $db->string($args->theme->linkFg),
            $db->string($args->theme->linkActBg),
            $db->string($args->theme->linkActFg)
        ]);
        $db->close();
        return new Reply($result?'ok': 'error', $result);
    }
}

function themeInsert(stdClass $args) : Reply{

    $db = new Db($args->database); 
    $db->open();
    
    $id = insertTheme($db, $args->theme); 
    
    $db->close();

    return new Reply( 
        $id>0 ? 'ok' : 'error',
        $id>0 ? $id : $db->lastError());
}

function saveThemeAs( stdClass $args ) : Reply {
    
    return loadForm('theme/html/save_as');
}
?>
