<?php

require_once __DIR__ . '/../../tools/reply.php';
require_once __DIR__ . '/../../db/db.php';

function menu(Db $db, string $username, string $logo): string|null
{
    // Grab all pages to show in navbar
    $pages = $db->select('page', ['id', 'isParent', 'parentId', 'title'], null, $db->name('pos') . ' asc');

    $pagesAtTop = array();
    for ($i = 0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if ($page['isParent'] === '1' || $page['parentId'] === '0') {
            array_push($pagesAtTop, $page);
        }
    }

    $html = 
    '<nav>
        <div class="navcontainer">
           <div id="toggle-icon" class="toggle-icon" onclick="evToggleIcon(this)">
               <i><img id="nav-burger" class="nav-burger" src=/icons/white/menu.svg></i>
               <i><img id="nav-close" class="nav-burger" style="display:none" src=/icons/white/close.svg></i>
           </div>
           <div class="logo">'.$logo.'</div>
           <div id="menu" class="menu">
               <div class="links">
                   <ul>';

    foreach ($pagesAtTop as $page) {
        if ($page['isParent'] === '0') {
            $html .= '<li><a href="#" onclick="evPageSelected('.$page['id'].')">' . $page['title'] . '</a></li>';
        } 
        else {

            $html .= '<li class="parent" onclick="evParentSelected(this)"><a href="#">' . $page['title'] . '</a>
                    <ul class="childs">';

            $childs =  $db->select('page', ['isParent', 'parentId', 'title'], $db->name('parentId').'='.$page['id'], $db->name('pos') . ' asc'); 
            if( gettype($childs) === 'string' ) { 
                return null ;
            }
            for ($j = 0; $j < count($childs); $j++) {
                $child = $childs[$j];
                if ($username || $child['public'] === '1') {
                    $html .= '<li><a href="#"  onclick="evPageSelected('.$page['id'].')">' . $child['title'] . '</a></li>';
                }
            }
            $html .= '</ul></li>';
        }
    }

    // Add the theme selector
    $html .= '<li class="parent" onclick="evParentSelected(this)"><a href="#">Teman</a>
    <ul class="childs">';


    $themesnames  = $db->select('theme', ['name'], null, $db->name('name') . ' asc');

    for ($j = 0; $j < count($themesnames); $j++) {
        $tname = $themesnames[$j];
        $html .= '<li><a href="#"  onclick="evThemeSelected(\''.$tname.'\')">' . $tname['name'] . '</a></li>';
    }
    $html .= '</ul></li>';

    // and we are done!
    $html .= 
    '</ul></div>
    </div>
    </div>
    </nav>';

    return $html;
}

