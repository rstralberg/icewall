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

// require_once __DIR__ . '/../php/framework/footer.php';
// require_once __DIR__ . '/../php/framework/navbar.php';

require_once __DIR__ . '/../php/page/create.php';
require_once __DIR__ . '/../php/page/delete.php';
require_once __DIR__ . '/../php/page/edit.php';
require_once __DIR__ . '/../php/page/get.php';
require_once __DIR__ . '/../php/page/pagetitle.php';
require_once __DIR__ . '/../php/page/editPageTheme.php';
require_once __DIR__ . '/../php/page/rename.php';
require_once __DIR__ . '/../php/page/update.php';

require_once __DIR__ . '/../php/theme/create.php';
require_once __DIR__ . '/../php/theme/edit.php';
require_once __DIR__ . '/../php/theme/get.php';
require_once __DIR__ . '/../php/theme/save.php';
require_once __DIR__ . '/../php/theme/colors.php';
require_once __DIR__ . '/../php/theme/borders.php';
require_once __DIR__ . '/../php/theme/fonts.php';
require_once __DIR__ . '/../php/theme/delTheme.php';
require_once __DIR__ . '/../php/theme/insTheme.php';
require_once __DIR__ . '/../php/theme/updTheme.php';
require_once __DIR__ . '/../php/theme/sizes.php';
require_once __DIR__ . '/../php/theme/shadows.php';

require_once __DIR__ . '/../php/user/password.php';
require_once __DIR__ . '/../php/user/edit.php';
require_once __DIR__ . '/../php/user/login.php';
require_once __DIR__ . '/../php/user/logout.php';
require_once __DIR__ . '/../php/user/newUser.php';

require_once __DIR__ . '/../php/tools/getValue.php';
require_once __DIR__ . '/../php/tools/popup.php';
require_once __DIR__ . '/../php/tools/errorMsg.php';
require_once __DIR__ . '/../php/tools/reply.php';

// --------------
require_once __DIR__ . '/../php/navbar/navbar.php';
require_once __DIR__ . '/srvreq.php';

// --------------

$data = file_get_contents('php://input');

if ($data===null) {
    $reply = new Reply(false, 'Tom begäran');
    $reply->send();
    exit(0);
}

$data = json_decode($data);
if ($data->what === null) {
    $reply = new Reply(false, 'Typ av begäran saknas');
    $reply->send();
    exit(0);
}

$srvreq = new SrvReq($data);
if( !$srvreq->verifyArgs() ) {
    $reply = new Reply(false, 'Grundläggande uppgifter saknas i server förfrågan');
    exit(0);
}
$srvreq->execute();
exit(0);



// $func = $data->what;
// if(!function_exists($func)) {
//     $reply = new Reply(false,  'Funktionen "' . $func . '" finns inte på servern');
//     $reply->send();
//     exit(0);
// }

// try {
//     $arg = gettype($data->args)==='object'?$data->args:json_decode($data->args);
//     $reply = $func($arg);
//     $reply->send();
//     exit(0);
// } 
// catch (Exception $ex) {
//     $reply = new Reply(false, $ex);
//     $reply->send();
// }
// exit(0);

