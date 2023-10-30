<?php

function generateScripts() : string {

    function script($file) :string  {
        return '<script type="application/javascript" src="js/'. $file . '.js"></script>';
    }

    $html = '';

    // root
    $html.= script('constants');
    $html.= script('index');
    $html.= script('navbar');
  

    // utils
    $html.= script('tools/base64');
    $html.= script('tools/conversions');
    $html.= script('tools/cookies');
    $html.= script('tools/element');
    $html.= script('tools/form');
    $html.= script('tools/getValue');
    $html.= script('tools/popup');
    $html.= script('tools/session');
    $html.= script('tools/site');
    $html.= script('tools/SrvReq');
    $html.= script('tools/style');
    $html.= script('tools/uploadAudio');
    $html.= script('tools/uploadImage');
    $html.= script('tools/utils');
    $html.= script('tools/error');
    $html.= script('tools/webform');

    // content
    $html.= script('content/audio');
    $html.= script('content/content');
    $html.= script('content/create');
    $html.= script('content/delete');
    $html.= script('content/editor');
    $html.= script('content/update');
    $html.= script('content/get');
    $html.= script('content/image');
    $html.= script('content/save');
    $html.= script('content/soundcloud');
    $html.= script('content/spotify');
    $html.= script('content/youtube');

    // framework
    $html.= script('framework/footer');
    $html.= script('framework/navbar');
    $html.= script('framework/left');
    $html.= script('framework/right');

    // page
    $html.= script('page/page');
    $html.= script('page/pagestyle');
    $html.= script('page/create');
    $html.= script('page/delete');
    $html.= script('page/rename');
    $html.= script('page/title');

    // settings
    $html.= script('settings/edit');
    $html.= script('settings/update');

    // theme
    $html.= script('theme/create');
    $html.= script('theme/theme');
    $html.= script('theme/get');
    $html.= script('theme/page');
    $html.= script('theme/save');
    $html.= script('theme/shadows');
    $html.= script('theme/colors');
    $html.= script('theme/borders');
    $html.= script('theme/fonts');
    $html.= script('theme/sizes');

    // user
    $html.= script('user/User');
    $html.= script('user/account');
    $html.= script('user/edit');
    $html.= script('user/login');
    $html.= script('user/logout');
    $html.= script('user/password');
    $html.= script('user/newUser');
    
    return $html;

}

?>