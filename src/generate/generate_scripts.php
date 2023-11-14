<?php

function generate_scripts() : string {
    
    function script($file) :string  {
        return '<script type="application/javascript" src="'. $file . '.js"></script>';
    }
    
    $html = script('src/const');

    $html.= script('src/utils/server');
    $html.= script('src/utils/querys');
    $html.= script('src/utils/session');
    $html.= script('src/utils/form');
    $html.= script('src/utils/style');
    $html.= script('src/utils/conv');
    $html.= script('src/utils/upload');
    $html.= script('src/utils/strings');
    $html.= script('src/utils/images');
    $html.= script('src/utils/popup');
    $html.= script('src/utils/error');
    $html.= script('src/utils/simple');
    $html.= script('src/utils/yesno');

    $html.= script('src/tools/tools');
    $html.= script('src/tools/usertools');
    $html.= script('src/tools/admintools');
    
    $html.= script('src/tools/sys/sys_pages');
    $html.= script('src/tools/sys/sys_settings');
    $html.= script('src/tools/sys/sys_themes');
    $html.= script('src/tools/sys/sys_users');

    $html.= script('src/tools/th/th_bars');
    $html.= script('src/tools/th/th_buttons');
    $html.= script('src/tools/th/th_content');
    $html.= script('src/tools/th/th_footer');
    $html.= script('src/tools/th/th_forms');
    $html.= script('src/tools/th/th_general');
    $html.= script('src/tools/th/th_inputs');
    $html.= script('src/tools/th/th_menu');
    $html.= script('src/tools/th/th_titlebar');
 
    $html.= script('src/base/navbar');
    $html.= script('src/base/footer');
    $html.= script('src/base/titlebar');
    $html.= script('src/base/content');
    $html.= script('src/base/page');
    $html.= script('src/base/theme');
    
    $html.= script('src/editor/editor');
    $html.= script('src/editor/tags');
    $html.= script('src/editor/utils');
    $html.= script('src/editor/audio');
    $html.= script('src/editor/line');
    $html.= script('src/editor/link');
    $html.= script('src/editor/soundcloud');
    $html.= script('src/editor/spotify');
    $html.= script('src/editor/youtube');
    $html.= script('src/editor/title');
    
    $html.= script('src/actions/login');
    $html.= script('src/actions/logout');
    $html.= script('src/actions/update_section_style');
    $html.= script('src/actions/update_content_positions');

    $html.= script('index');
    
    return $html;
    
}

?>