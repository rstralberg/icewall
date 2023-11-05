<?php

function generate_scripts() : string {

    function script($file) :string  {
        return '<script type="application/javascript" src="'. $file . '.js"></script>';
    }

    $html = script('src/utils/server');
    $html.= script('src/utils/querys');
    $html.= script('src/utils/session');
    $html.= script('src/utils/form');
    $html.= script('src/utils/style');
    $html.= script('src/utils/conv');

    $html.= script('src/tools/usertools');
    $html.= script('src/tools/admintools');

    $html.= script('src/base/navbar');
    $html.= script('src/base/footer');
    $html.= script('src/base/titlebar');
    $html.= script('src/base/content');
    $html.= script('src/base/page');
    $html.= script('src/base/theme');
    
    $html.= script('src/actions/login');
    $html.= script('src/actions/logout');
    $html.= script('src/actions/create_page');
    $html.= script('src/actions/delete_page');
    $html.= script('src/actions/rename_page');
    $html.= script('src/actions/toggle_titlebar');
    $html.= script('src/actions/page_public');
    $html.= script('src/actions/add_content');

    $html.= script('index');
    
    return $html;
    
}

?>