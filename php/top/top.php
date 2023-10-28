<?php

require_once __DIR__ . '/logo/logo.php';
require_once __DIR__ . '/menu/menu.php';

function top(stdClass $args): Reply
{
    $argErr = argError('top', $args, [
        'username' => $args->username
    ]);
    if ($argErr ) return  $argErr; 

    $db = new Db($args->database); 
    $db->open();

    $logo = logo($db, $args->username);
    if( $logo === null ) die('Failed to load website settings');

    $html = menu($db, $args->username, $logo);
    return new Reply(true, compressHTML($html));
}
