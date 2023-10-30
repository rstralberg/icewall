<?php

use function PHPSTORM_META\map;

class Reply {

    public bool $ok = false;
    public string $content = ':';

    function __construct(bool $ok, string|stdClass|bool $content ) {
        $this->ok = $ok;
        $this->content = $content;
    }

    function send() : void {
        header('Content-Type: application/json');
        echo( json_encode( [
            'ok' => $this->ok,
            'content' => $this->content
        ]));
    }
}

class SrvArg {
    
    private string $name;
    private bool|string|int|float|object $value;
    private string $type;

    public function __construct(stdClass $arg ) {
        $this->name = $arg->key;
        $this->value = $arg->value;
        $this->type = $arg->type;
    }

    public function name() : string {
        return $this->name;
    }

    public function get() : bool|string|int|float|object {
        switch( $this->type ) {
            case 'boolean': return $this->value==='1';
            case 'object':  return json_decode($this->value);
            case 'int': return intval($this->value);
            case 'float': return floatval($this->value);
        }
        return $this->value;
    }
}

class SrvReq {

    private $what;
    public $args;

    function __construct( stdClass $args ) {
        $this->what = $args->what;
        $this->args = $args->args;
    }

    function verifyArgs( array $argNames =[] ): string | bool {
        if( !isset( $this->args->key)) return 'SrvReq: "key" is missing';
        foreach($argNames as $argname ) {
            if( !isset( $this->args->$argname) ) return 'SrvReq: "' . $argname . '" is missing';
        }
        return true;
    }

    function execute() : void {
        if(!function_exists($this->what)) {
            $reply = new Reply(false,  'Funktionen "' . $this->what . '" finns inte på servern');
            $reply->send();
        } 
        else {
            $func = $this->what;
            $reply = $func($this);
            $reply->send();
        }
    }           
}


function argError(string $funcName, stdClass $args, array $expr = []) : Reply |bool {
    $ret = '';
    if( !isset($args->database) || $args->database === null ) { $ret .= $funcName . ': "database" missing' . PHP_EOL; }
    if( !isset($args->database) || $args->key === null ) { $ret .=  $funcName . ': "key" missing' . PHP_EOL; }
    foreach( $expr as $k => $v ) {
        if( !isset($v) ) { $ret .=  $funcName . ': "' .$k. '" missing' . PHP_EOL; }
    }
    if( $ret !== '') { return new Reply(false, '#' . $ret); } else 
    { return false; }
}
?>
