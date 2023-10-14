<?php

function generateScripts() : string {

    function script($file) :string  {
        return '<script type="application/javascript" src="js/'. $file . '.js"></script>';
    }

    $html = '';

    // root
    $html.= script('constants');
    $html.= script('index');

    // utils
    $html.= script('utils/base64');
    $html.= script('utils/conversions');
    $html.= script('utils/cookies');
    $html.= script('utils/form');
    $html.= script('utils/getValue');
    $html.= script('utils/popup');
    $html.= script('utils/request');
    $html.= script('utils/session');
    $html.= script('utils/style');
    $html.= script('utils/uploadAudio');
    $html.= script('utils/uploadImage');
    $html.= script('utils/utils');
    $html.= script('utils/webform');

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
    $html.= script('framework/tools');

    // page
    $html.= script('page/create');
    $html.= script('page/delete');
    $html.= script('page/edit');
    $html.= script('page/get');
    $html.= script('page/rename');
    $html.= script('page/title');
    $html.= script('page/update');

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
    $html.= script('user/account');
    $html.= script('user/delete');
    $html.= script('user/edit');
    $html.= script('user/get');
    $html.= script('user/login');
    $html.= script('user/logout');
    $html.= script('user/password');
    $html.= script('user/update');
    $html.= script('user/verify');

    return $html;

}

?>