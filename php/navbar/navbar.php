<?php

require_once __DIR__ . '/logo/logo.php';
require_once __DIR__ . '/../generate/generateNavbar.php';
require_once __DIR__ . '/../tools/reply.php';

function refreshNavbar( SrvReq $req ) : Reply {
    return generateNavbar($req);
}


function top(stdClass $args): Reply
{
    $argErr = argError('top', $args, [
        'username' => $args->username
    ]);
    if ($argErr ) return  $argErr; 

    $db = new db(); 
    $db->open($args->database);

    $logo = logo($db, $args->username);
    if( $logo === null ) die('Failed to load website settings');

    $html = menu($db, $args->username, $logo);
    return new Reply(true, compressHTML($html));
}
