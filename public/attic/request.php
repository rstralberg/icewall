<?php

// require_once __DIR__ . '/../php/content/audio.php';
// require_once __DIR__ . '/../php/content/content.php';
// require_once __DIR__ . '/../php/content/image.php';
// require_once __DIR__ . '/../php/content/soundcloud.php';
// require_once __DIR__ . '/../php/content/spotify.php';
// require_once __DIR__ . '/../php/content/weblink.php';
// require_once __DIR__ . '/../php/content/youtube.php';
// require_once __DIR__ . '/../php/content/add.php';
// require_once __DIR__ . '/../php/content/delete.php';
// require_once __DIR__ . '/../php/content/save.php';
// require_once __DIR__ . '/../php/content/update.php';

// require_once __DIR__ . '/../php/framework/footer.php';
// require_once __DIR__ . '/../php/framework/navbar.php';

// require_once __DIR__ . '/../php/page/create.php';
// require_once __DIR__ . '/../php/page/delete.php';
// require_once __DIR__ . '/../php/page/edit.php';
// require_once __DIR__ . '/../php/page/get.php';
// require_once __DIR__ . '/../php/page/pagetitle.php';
// require_once __DIR__ . '/../php/page/editPageTheme.php';
// require_once __DIR__ . '/../php/page/rename.php';
// require_once __DIR__ . '/../php/page/update.php';

// require_once __DIR__ . '/../php/theme/create.php';
// require_once __DIR__ . '/../php/theme/edit.php';
// require_once __DIR__ . '/../php/theme/get.php';
// require_once __DIR__ . '/../php/theme/save.php';
// require_once __DIR__ . '/../php/theme/colors.php';
// require_once __DIR__ . '/../php/theme/borders.php';
// require_once __DIR__ . '/../php/theme/fonts.php';
// require_once __DIR__ . '/../php/theme/delTheme.php';
// require_once __DIR__ . '/../php/theme/insTheme.php';
// require_once __DIR__ . '/../php/theme/updTheme.php';
// require_once __DIR__ . '/../php/theme/sizes.php';
// require_once __DIR__ . '/../php/theme/shadows.php';

// require_once __DIR__ . '/../php/user/password.php';
// require_once __DIR__ . '/../php/user/edit.php';
// require_once __DIR__ . '/../php/user/login.php';
// require_once __DIR__ . '/../php/user/logout.php';
// require_once __DIR__ . '/../php/user/newUser.php';

// require_once __DIR__ . '/../php/tools/getValue.php';
// require_once __DIR__ . '/../php/tools/popup.php';
// require_once __DIR__ . '/../php/tools/errorMsg.php';
// require_once __DIR__ . '/../php/tools/reply.php';

// --------------
require_once __DIR__ . '/../php/navbar/navbar.php';
require_once __DIR__ . '/../php/users/getuser.php';
require_once __DIR__ . '/../php/pages/getpage.php';
require_once __DIR__ . '/../php/tools/error.php';


// --------------

$data = file_get_contents('php://input');

if ($data===null) {
    sendReply(false, 'Empty request!');
    exit(0);
}

try {
    $data = json_decode($data);
    if ($data === null) {
        sendReply(false, 'Failed to decode request');
        exit(0);
    }

    $func = $data->func;
    if(!function_exists($func)) {
        sendReply(false,  'Requested function "' . $func . '" cant be found on server');
        exit(0);
    }

    $func($data);
} 
catch (Exception $ex) {
    sendReply(false, $ex);
}
exit(0);

