<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/load_html.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['pageid', 'theme'])) {

    $db = db_open($args->key);

    $pages = db_select($db, 'pages', ['*'], null, db_order_by('pos', 'asc'));

    if ($pages === false) {
        // No idea to continue without pages!!!!
        db_close($db);
        send_reject('No pages exist');
        return;
    }

    $html = '<div class="topnav" id="top-menu">';
    for($i=0; $i < count($pages); $i++) {
        $page = $pages[$i];
        
        if( $page['isParent']==='0' && $page['parentId'] === '0') {
            $active = $page['id']===$args->pageid ? 'active' : '';
            $html .= '<a href="#" class="toplink '.$active.'" onclick="page_selected('.$page['id'].')">'.$page['title'].'</a>';
        }
        else if ( $page['isParent'] === '1') {
            $html .= '<div class="dropdown">';
            $html .= '<button class="dropbtn">' . $page['title'] . '<i class="fa fa-caret-down"></i></button>';
            $html .= '<div class="dropdown-content">';
        
            $subpages = db_select($db, 'pages', ['*'], db_where($db, 'parentId', $page['id']), db_order_by('pos', 'asc'));
            if( $subpages !== false ) {
                for($j=0; $j < count($subpages); $j++) {
                    $subpage = $subpages[$j];
                    $active = $subpage['id']===$args->pageid ? 'class="active"' : '';

                    $html .= '<a href="#" '.$active.' onclick="page_selected('.$subpage['id'].')">'.$subpage['title'].'</a>';
                }
            }
            $html .= '</div></div>';
        } 
    }
    
    $themes = db_select($db, 'themes', ['name'], null, db_order_by('name', 'asc'));
    if( $themes === false ) {
        send_reject('Kunde inte ladda teman');
        exit(0);
    } 
    else if ( gettype($themes) === 'string ') {
        send_reject($themes);
        exit(0);
    }

    $html.= '<div class="dropdown">';
    $html.= '<button class="dropbtn"><i class="fa fa-caret-down"></i>Tema</button>';
    $html.= '<div class="dropdown-content">';

    for($i=0; $i < count($themes); $i++) {
        $theme = $themes[$i];
        $active = $theme['name']===$args->theme ? 'class="active"' : '';
        $html .= '<a href="#" '. $active . ' onclick="theme_selected(\''.$theme['name'].'\')">'.$theme['name'].'</a>';
    }

   $html .= '</div></div>';

   $html .= '<a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="top_menu_toggle()">&#9776;</a>';
   $html .= '</div>';


    // $fh = fopen(__DIR__.'/top.html', 'w');
    // fwrite($fh,$html);   
    // fclose($fh);

    send_resolve( compress_html($html) );
}