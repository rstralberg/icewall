<?php

require_once __DIR__ . '/../../../db/db.php';
require_once __DIR__ . '/../../../db/theme.php';
require_once __DIR__ . '/../../../tools/reply.php';

function getColors(stdClass $args ) : Reply {
    
    $argErr= argError('getColors', $args, [
        'theme' => $args->theme,
        'name' => $args->name
    ]);
    if( $argErr ) {return $argErr; }

    $db = new db();
    $db->open($args->database);

    $id = themeName2id($args->name);
    $themeName = $args->theme;
    $themes = $db->select('theme', [$id], $db->name('name').'='.$db->string($themeName));
    if( !$themes ) {
        $db->close();
        return new Reply(false, 'Could not find Theme "'. $args->theme . '"');
    }

    $theme= $themes[0];
    $styles = $db->select('styles', ['bg', 'fg', 'bgHi', 'fgHi'], $db->name('id').'='. $theme[$id]);
    $db->close();
    if( !$styles ) {
        return new Reply(false, 'Could not load requested Colors!');
    }

    return new Reply(true, json_encode($styles[0]));
}

?>
