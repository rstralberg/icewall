<?php

function split($str, $delm)
{
    return [ 
        strstr($str, $delm, true), 
        ltrim(strstr($str, $delm), $delm) 
    ];
}

function splitInTwo($str, $delm)
{
    return [
        'first' => strstr($str, $delm, true),
        'second' => ltrim(strstr($str, $delm), $delm)
    ];
}

function trimEnd(string $str, int $numChar ): string {
    return substr($str, 0, strlen($str)-$numChar);
}

function surround(string $str, string $char) : string {
    return $char . $str . $char;
}

function replace( string $str, string $replace, string $replacement) {
    return str_replace($replace, $replacement, $str);

}


?>

