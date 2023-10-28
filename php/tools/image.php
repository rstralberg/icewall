<?php

function safeImageFile(string $siteKey, string $file) : string {
    
    if( file_exists( $file ) ) { 
        return $file;
    }
    return 'icons/icewall-error.png';
}
?>