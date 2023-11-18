<?php

function generate_scripts() : string {
    
    function script($file) :string  {
        return '<script type="application/javascript" src="'. $file . '.js"></script>';
    }
    
    $html = script('src/const');

    $html.= script('src/utils/conv');
    $html.= script('src/utils/elements');
    $html.= script('src/utils/footer');
    $html.= script('src/utils/form');
    $html.= script('src/utils/images');
    $html.= script('src/utils/server');
    $html.= script('src/utils/session');
    $html.= script('src/utils/strings');
    $html.= script('src/utils/style');  
    $html.= script('src/utils/tools');  
    $html.= script('src/utils/upload');
    
    $html.= script('src/content/get_content');
    $html.= script('src/content/add_content');
    $html.= script('src/content/positions');
    $html.= script('src/content/style');
    // $html.= script('src/content/style_upd');
    // $html.= script('src/content/positions_upd');

    $html.= script('src/content/addons/audio');
    $html.= script('src/content/addons/line');
    $html.= script('src/content/addons/link');
    $html.= script('src/content/addons/soundcloud');
    $html.= script('src/content/addons/spotify');
    $html.= script('src/content/addons/title');
    $html.= script('src/content/addons/youtube');
    
    $html.= script('src/editor/editor');
    $html.= script('src/editor/tags');
    $html.= script('src/editor/utils');

    $html.= script('src/forms/popup');
    $html.= script('src/forms/error');
    $html.= script('src/forms/simple');
    $html.= script('src/forms/yesno');

    $html.= script('src/menus/adm_menu');
    $html.= script('src/menus/usr_menu');

    // $html.= script('src/image/');    
    
    $html.= script('src/pages/page');
    $html.= script('src/pages/create_page');
    $html.= script('src/pages/delete_page');
    $html.= script('src/pages/sys_pages');
    $html.= script('src/pages/enable_title');
    $html.= script('src/pages/page_public');
    $html.= script('src/pages/rename_page');
    $html.= script('src/pages/get_title');

    $html.= script('src/header/avatar');
    $html.= script('src/header/logo');
    $html.= script('src/header/top');

    $html.= script('src/settings/sys_settings');
        
    $html.= script('src/themes/theme');
    $html.= script('src/themes/themes');
    $html.= script('src/themes/bars');
    $html.= script('src/themes/buttons');
    $html.= script('src/themes/content');
    $html.= script('src/themes/footer');
    $html.= script('src/themes/forms');
    $html.= script('src/themes/general');
    $html.= script('src/themes/inputs');
    $html.= script('src/themes/menu');
    $html.= script('src/themes/title');
    $html.= script('src/themes/mark');
    
    $html.= script('src/users/login');
    $html.= script('src/users/logout');
    $html.= script('src/users/password');
    $html.= script('src/users/users');
    
    $html.= script('index');
    
    return $html;
    
}

?>