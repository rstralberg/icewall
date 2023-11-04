<?php

function generate_scripts() : string {

    function script($file) :string  {
        return '<script type="application/javascript" src="'. $file . '.js"></script>';
    }

    $html = script('src/utils/server');
    $html.= script('src/utils/element_querys');
    $html.= script('src/utils/session');
    $html.= script('src/tools/usertools');
    $html.= script('src/tools/admintools');
    $html.= script('src/base/navbar');
    $html.= script('index');
    
    return $html;
    
}

?>