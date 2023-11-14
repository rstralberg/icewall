<?php 

function generate_fonts() : void {
    
    $css = '/* Autogenerated by IceWall */' . PHP_EOL;
    $fonts = array();
    $fontfiles = glob('../public/fonts/*.ttf');
    foreach ($fontfiles as $font) {
        $parts = pathinfo($font);
        $ff = '@font-face {' . PHP_EOL 
            . '    font-family:' . $parts['filename'] . ';' . PHP_EOL
            . '    src: url(../fonts/' . $parts['basename'] . ');'. PHP_EOL
            . '}' . PHP_EOL;
        $css .= $ff;
        array_push( $fonts, $parts['filename'] );
    }
    
    $cssfile = __DIR__ . '/../../public/css/fonts.css';
    $fh = fopen($cssfile, 'w');
    fwrite($fh, $css);
    fclose($fh);
}

function get_fontnames() : array {
   
    $fonts = array();
    $fontfiles = glob( __DIR__ . '/../../public/fonts/*.ttf');
    foreach ($fontfiles as $font) {
        $parts = pathinfo($font);
        array_push($fonts, $parts['filename']);
    }
    return $fonts;
}
?>
