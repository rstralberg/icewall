<?php

function generateScripts() : string {

    function script($file) :string  {
        return '<script type="application/javascript" src="js/'. $file . '.js"></script>';
    }

    $html = script('constants');
    $html.= script('index');
    $html.= script('cookies');
    $html.= script('conversions');
    $html.= script('blocks');
    $html.= script('navbar');
    $html.= script('style');
    $html.= script('utils');
    $html.= script('form');
    $html.= script('popup');
    $html.= script('login');
    $html.= script('logout');
    $html.= script('base64');
    $html.= script('webform');
    $html.= script('requests/addBlock');
    $html.= script('requests/createDefaultTheme');
    $html.= script('requests/deleteBlock');
    $html.= script('requests/deleteUser');
    $html.= script('requests/getBlocks');
    $html.= script('requests/getFooter');
    $html.= script('requests/getNavbar');
    $html.= script('requests/getPageGroup');
    $html.= script('requests/getPageTitle');
    $html.= script('requests/getTheme');
    $html.= script('requests/getThemePart');
    $html.= script('requests/getTools');
    $html.= script('requests/getUser');
    $html.= script('requests/getValue');
    $html.= script('requests/hidePageTitle');
    $html.= script('requests/removePage');
    $html.= script('requests/request');
    $html.= script('requests/saveBlock');
    $html.= script('requests/saveNewPage.');
    $html.= script('requests/saveTheme');
    $html.= script('requests/showPageTitle');
    $html.= script('requests/updatePageParent');
    $html.= script('requests/updatePagePosition');
    $html.= script('requests/updatePageTitle');
    $html.= script('requests/updatePassword');
    $html.= script('requests/updateSettings');
    $html.= script('requests/updateUser');
    $html.= script('requests/verifyLogin');
    $html.= script('uploadImage');
    $html.= script('uploadAudio');
    $html.= script('editor/editor');
    $html.= script('editor/edImage');
    $html.= script('editor/edAudio');
    $html.= script('editor/edSpotify');
    $html.= script('editor/edSoundcloud');
    $html.= script('editor/edYoutube');
    $html.= script('page/pagetitle');
    $html.= script('page/createPage');
    $html.= script('page/deletePage');
    $html.= script('page/renamePage');
    $html.= script('edits/editSettings');
    $html.= script('edits/editPages');
    $html.= script('edits/editThemes');
    $html.= script('edits/editUsers');
    $html.= script('edits/editAccount');
    $html.= script('edits/changePassword');
    
    
    return $html;

}

?>