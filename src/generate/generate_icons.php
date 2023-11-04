<?php 

require_once __DIR__ . '/../config.php';

function generate_icons() : string {
    
    $fh = fopen(__DIR__. '/../../public/icons/site.webmanifest', 'w');
    if($fh) {
        fwrite($fh, '
        {
            "name": "",
            "short_name": "",
            "icons": [
                {
                    "src": "/' . ICON_PREFIX . '-180x180.png",
                    "sizes": "180x180",
                    "type": "image/png"
                },
                {
                    "src": "/' . ICON_PREFIX . '-32x32.png",
                    "sizes": "32x32",
                    "type": "image/png"
                },
                {
                    "src": "/' . ICON_PREFIX . '-16x16.png.png",
                    "sizes": "16x16",
                    "type": "image/png"
                }
            ],
            "theme_color": "#ffffff",
            "background_color": "#ffffff",
            "display": "standalone"
        }');
        fclose($fh);
    }


    $html  = '<link rel="apple-touch-icon" sizes="180x180" href="icons/' . ICON_PREFIX . '-180x180.png">';
    $html .= '<link rel="icon" type="image/png" sizes="32x32" href="icons/' . ICON_PREFIX . '-32x32.png">';
    $html .= '<link rel="icon" type="image/png" sizes="16x16" href="icons/' . ICON_PREFIX . '-16x16.png">';
    $html .= '<link rel="manifest" href="icons/site.webmanifest">';

    return $html;
}

?>
