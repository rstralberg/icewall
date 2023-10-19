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

class Request {

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

?>
