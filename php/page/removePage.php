<?php

require_once __DIR__ . '/../tools/reply.php';
require_once __DIR__ . '/../../tools/loadForm.php';
require_once __DIR__ . '/page.php';


function deletePageResources(Db $db, $folder, $pageId)
{
    $contents = $db->select('content', ['html'], $db->name('pageId') . '=' . $pageId);
    if ($contents) {
        // for all sections in page
        foreach ($contents as $content) {
            $resources = parseContentResources($content['html']);
            // for everthing that has a 'src=.....'
            if (count($resources) > 0) {
                foreach ($resources as $resource) {
                    // is it a file 
                    if (is_file($resource)) {
                        // delete file
                        unlink($resource);
                    }
                }
            }
        }
    }
}

function parseContentResources(string $html): array
{
    $resources = [];
    $index = strpos($html,'src=');
    while( $index !== false ) {
        $srcStart = strpos( $html,'"', $index + 1);
        $srcEnd = strpos( $html,'"', $srcStart+1);
        $src = substr( $html, $srcStart, $srcEnd-$srcStart);
        $expl = explode('/sites', $src);
        if( count($expl) > 1) {
            $resources[] = realpath(__DIR__ . '/../../public/sites' . $expl[1]);
        }
        $index = strpos( $html,'src=', $srcEnd);
    }
    return $resources;
}


?>