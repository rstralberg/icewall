<?php

require_once __DIR__ . '/../tools/reply.php';
require_once __DIR__ . '/../db/db.php';

function getuser( stdClass $args) : void {

    if( verifyRequest($args)=== false ) return;
    if( verifyRequestArg($args,'username')=== false ) return;

    $db = new db($args->key);

    $users = $db->select('users', ['*'], $db->where('username',$args->username));
    if( $users === false) sendReply(false, 'User "'.$args->username.'" not found');

    $user = $users[0];
    sendReply(true, $user);
}

?>