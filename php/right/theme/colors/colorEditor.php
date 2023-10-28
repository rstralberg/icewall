<?php

require_once __DIR__ . '/../../../tools/reply.php';
require_once __DIR__ . '/../../../tools/loadForm.php';

function colorEditor(stdClass $args): Reply {
    
    $argErr = argError('colorEditor', $args, [
        'name' => $args->name,
        'bg' => $args->bg,
        'fg' => $args->fg,
        'bgHi' => $args->bgHi,
        'fgHi' => $args->fgHi,
    ]);
    if( $argErr ) return $argErr;

    return loadForm(__DIR__ . '/editColors' . $args->name, [
        'name' => $args->name,
        'bg' => $args->bg,
        'fg' => $args->fg,
        'bgHi' => $args->bgHi,
        'fgHi' => $args->fgHi
    ]);
}

?>