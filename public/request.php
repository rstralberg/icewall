<?php

require_once __DIR__ . '/../php/utils/reqrep.php';
require_once __DIR__ . '/../php/requests/addBlock.php';
require_once __DIR__ . '/../php/requests/audio.php';
require_once __DIR__ . '/../php/requests/blocks.php';
require_once __DIR__ . '/../php/requests/changePassword.php';
require_once __DIR__ . '/../php/requests/createDefaultTheme.php';
require_once __DIR__ . '/../php/requests/createPage.php';
require_once __DIR__ . '/../php/requests/deleteAccount.php';
require_once __DIR__ . '/../php/requests/deleteBlock.php';
require_once __DIR__ . '/../php/requests/deletePage.php';
require_once __DIR__ . '/../php/requests/deleteUser.php';
require_once __DIR__ . '/../php/requests/editAccount.php';
require_once __DIR__ . '/../php/requests/editPages.php';
require_once __DIR__ . '/../php/requests/editSettings.php';
require_once __DIR__ . '/../php/requests/editThemes.php';
require_once __DIR__ . '/../php/requests/editUsers.php';
require_once __DIR__ . '/../php/requests/footer.php';
require_once __DIR__ . '/../php/requests/getPageGroup.php';
require_once __DIR__ . '/../php/requests/getUser.php';
require_once __DIR__ . '/../php/requests/getTheme.php';
require_once __DIR__ . '/../php/requests/getThemeNames.php';
require_once __DIR__ . '/../php/requests/getThemeParts.php';
require_once __DIR__ . '/../php/requests/getValue.php';
require_once __DIR__ . '/../php/requests/hidePageTitle.php';
require_once __DIR__ . '/../php/requests/image.php';
require_once __DIR__ . '/../php/requests/login.php';
require_once __DIR__ . '/../php/requests/loginVerify.php';
require_once __DIR__ . '/../php/requests/logout.php';
require_once __DIR__ . '/../php/requests/navbar.php';
require_once __DIR__ . '/../php/requests/pagetitle.php';
require_once __DIR__ . '/../php/requests/popup.php';
require_once __DIR__ . '/../php/requests/removePage.php';
require_once __DIR__ . '/../php/requests/renamePage.php';
require_once __DIR__ . '/../php/requests/saveBlock.php';
require_once __DIR__ . '/../php/requests/saveTheme.php';
require_once __DIR__ . '/../php/requests/saveNewPage.php';
require_once __DIR__ . '/../php/requests/showPageTitle.php';
require_once __DIR__ . '/../php/requests/soundcloud.php';
require_once __DIR__ . '/../php/requests/spotify.php';
require_once __DIR__ . '/../php/requests/tools.php';
require_once __DIR__ . '/../php/requests/updatePageParent.php';
require_once __DIR__ . '/../php/requests/updatePagePosition.php';
require_once __DIR__ . '/../php/requests/updatePageTitle.php';
require_once __DIR__ . '/../php/requests/updatePassword.php';
require_once __DIR__ . '/../php/requests/updateSettings.php';
require_once __DIR__ . '/../php/requests/updateUser.php';
require_once __DIR__ . '/../php/requests/weblink.php';
require_once __DIR__ . '/../php/requests/youtube.php';


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

$func = 'on' . ucfirst($data->what);
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

