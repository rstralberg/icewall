<?php 



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

class SrvReq {

    private $what = '';
    private $args = null;

    function __construct($input) {
        $obj = json_decode($input);
        $this->what = $obj->what;
        $this->args = rawurldecode($obj->args);
    }

    function what()  { return $this->what; }
    function args()  { return $this->args; }
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
