<?php


function compressHTML(string $html): string {
    $res = preg_replace('/\s+/', ' ', $html);
    $res = preg_replace('/\s*<\s*/', '<', $res);
    $res = preg_replace('/\s*>\s*/', '>', $res);
    return $res;
}

function loadHTML(string $htmlFile, array $args = null, string $tag = '$'): string | bool
{
    $fh = fopen($htmlFile, 'r');
    if ($fh) {
        $html = fread($fh, 32000);
        fclose($fh);

        if ($html) {
            $html = compressHTML($html);
            if ($args !== null) {
                foreach ($args as $key => $value) {
                    $html = replace($html, $tag . '{' . $key . '}', $value==='null'||$value===null?'':$value);
                }
            }
            return $html;
        }
    }
    return false;
}

?>