<?php

require_once __DIR__ . '/../php/content/audio.php';
require_once __DIR__ . '/../php/content/content.php';
require_once __DIR__ . '/../php/content/image.php';
require_once __DIR__ . '/../php/content/soundcloud.php';
require_once __DIR__ . '/../php/content/spotify.php';
require_once __DIR__ . '/../php/content/weblink.php';
require_once __DIR__ . '/../php/content/youtube.php';
require_once __DIR__ . '/../php/content/add.php';
require_once __DIR__ . '/../php/content/delete.php';
require_once __DIR__ . '/../php/content/save.php';
require_once __DIR__ . '/../php/content/update.php';
require_once __DIR__ . '/../php/framework/footer.php';
require_once __DIR__ . '/../php/framework/leftTools.php';
require_once __DIR__ . '/../php/framework/rightTools.php';
require_once __DIR__ . '/../php/framework/navbar.php';
require_once __DIR__ . '/../php/page/create.php';
require_once __DIR__ . '/../php/page/delete.php';
require_once __DIR__ . '/../php/page/edit.php';
require_once __DIR__ . '/../php/page/get.php';
require_once __DIR__ . '/../php/page/pagetitle.php';
require_once __DIR__ . '/../php/page/rename.php';
require_once __DIR__ . '/../php/page/update.php';
require_once __DIR__ . '/../php/settings/edit.php';
require_once __DIR__ . '/../php/settings/update.php';
require_once __DIR__ . '/../php/theme/create.php';
require_once __DIR__ . '/../php/theme/edit.php';
require_once __DIR__ . '/../php/theme/get.php';
require_once __DIR__ . '/../php/theme/save.php';
require_once __DIR__ . '/../php/user/password.php';
require_once __DIR__ . '/../php/user/delete.php';
require_once __DIR__ . '/../php/user/edit.php';
require_once __DIR__ . '/../php/user/get.php';
require_once __DIR__ . '/../php/user/login.php';
require_once __DIR__ . '/../php/user/verify.php';
require_once __DIR__ . '/../php/user/logout.php';
require_once __DIR__ . '/../php/user/update.php';
require_once __DIR__ . '/../php/utils/getValue.php';
require_once __DIR__ . '/../php/utils/popup.php';
require_once __DIR__ . '/../php/utils/reqrep.php';


$data = file_get_contents('php://input');

if ($data===null) {
    $reply = new Reply('error', 'Empty request');
    $reply->send();
    exit(0);
}

$data = json_decode($data);
if ($data->what === null) {
    $reply = new Reply('error', 'Missing "what" in request');
    $reply->send();
    exit(0);
}

$func = $data->what;
if(!function_exists($func)) {
    $reply = new Reply('error',  '"' . $func . '" does not exist on server');
    $reply->send();
    exit(0);
}

try {
    $arg = gettype($data->args)==='object'?$data->args:json_decode($data->args);
    $reply = $func($arg);
    $reply->send();
    exit(0);
} 
catch (Exception $ex) {
    $reply = new Reply('error', $ex);
    $reply->send();
}
exit(0);

