<?php

function scripts() : string {
    
    function script($file) :string  {
        return '<script type="application/javascript" src="'. $file . '.js"></script>';
    }
    
    $html = script('src/const');

    $html.= script('src/utils/conv');
    $html.= script('src/utils/elements');
    $html.= script('src/utils/form');
    $html.= script('src/utils/images');
    $html.= script('src/utils/server');
    $html.= script('src/utils/session');
    $html.= script('src/utils/strings');
    $html.= script('src/utils/style');  
    $html.= script('src/utils/tools');  
    $html.= script('src/utils/upload');
    
    $html.= script('src/content/content');
    $html.= script('src/content/content_menu');
    $html.= script('src/content/content_pop');
    $html.= script('src/content/on_delete_content');
    $html.= script('src/content/get_content');
    $html.= script('src/content/add_content');
    $html.= script('src/content/update_content_positions');
    $html.= script('src/content/style');
    $html.= script('src/content/on_delete_content');
    $html.= script('src/content/on_save_content');
    $html.= script('src/content/on_move_content');
    $html.= script('src/content/on_public_content');
    $html.= script('src/content/on_format_content');
    
    $html.= script('src/content/addons/on_audio');
    $html.= script('src/content/addons/on_image');
    $html.= script('src/content/addons/on_line');
    $html.= script('src/content/addons/on_soundcloud');
    $html.= script('src/content/addons/on_spotify');
    $html.= script('src/content/addons/on_text');
    $html.= script('src/content/addons/on_title');
    $html.= script('src/content/addons/on_youtube');
    $html.= script('src/content/addons/on_weblink');
    
    $html.= script('src/image/add_image');
    
    $html.= script('src/forms/popup');
    $html.= script('src/forms/error');
    $html.= script('src/forms/simple');
    $html.= script('src/forms/yesno');

    $html.= script('src/admin/admin_pop');
    
    $html.= script('src/pages/page');
    $html.= script('src/pages/create_page');
    $html.= script('src/pages/delete_page');
    $html.= script('src/pages/edit_pages');
    $html.= script('src/pages/enable_title');
    $html.= script('src/pages/page_public');
    $html.= script('src/pages/rename_page');
    $html.= script('src/pages/get_title');

    $html.= script('src/header/get_avatar');
    $html.= script('src/header/get_logo');
    $html.= script('src/header/get_top_menu');
    $html.= script('src/header/menu_pop');

    $html.= script('src/settings/edit_settings');
        
    $html.= script('src/themes/theme');
    $html.= script('src/themes/edit_themes');
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
    $html.= script('src/users/edit_users');
    
    $html.= script('src/footer/get_footer');

    $html.= script('index');
    
    return $html;
    
}

?>