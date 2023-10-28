<?php

require_once __DIR__ . '/strings.php';

// ASSERTS
assert_options(ASSERT_ACTIVE, 1);
assert_options(ASSERT_WARNING, 0);

function assert_hander($file, $line, $code, $desc = null)
{
    echo 'IceWall: ### Assert in ' . $file . ' at line ' . $line .': ' . $code . hex2bin('0d0a');
    if ($desc) {
        echo ": $desc" . hex2bin('0d0a');
    }
    echo hex2bin('0d0a');
}
assert_options(ASSERT_CALLBACK, 'assert_handler');


// ERRORS
set_error_handler('appErrorHandler');
function appErrorHandler($errno, $errstr, $errfile, $errline)
{
    echo ('IceWall: ### ERROR [' . $errno . ']: ' . $errstr . '<br>' . hex2bin('0d0a'));
    echo ('FILE ' . $errfile . ' ' . ' at line ' . $errline . '<br>' . hex2bin('0d0a'));
}

// EXECPTIONS
set_exception_handler("appExceptionHandler");
function appExceptionHandler($exception)
{
    $out = 'IceWall: ### Exception ' . 
        $exception->getMessage() . '<br>' .  hex2bin('0d0a') .
        $exception->getFile() . ' at line ' . $exception->getLine() . '<br>' . hex2bin('0d0a') .
        '------------------------------------------------<br>' . hex2bin('0d0a') ;
        foreach( $exception->getTrace() as $trace ) {
            $out .= $trace['function'] . '(' ;
            if( array_key_exists('args', $trace ) ) {
                foreach($trace['args'] as $arg ) {
                    $out .=  $arg . ', ';
                }
                $out = trimEnd($out,2);
            }
            $out .= ');<br>' . hex2bin('0d0a') ;
        }
        $out .= '------------------------------------------------<br>' . hex2bin('0d0a') ;
    echo($out);
    return $out;
}

function userError(string $function, string $msg) : string {
    echo ('IceWall: ### ERROR in function ' . $function . '<br>' . hex2bin('0d0a'));
    echo ('Message: ' . $msg . '<br>' . hex2bin('0d0a'));
    return $function . ': ' . $msg;
}

