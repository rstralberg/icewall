<?php 

class Reply {

    private $status = '';
    private $content = ':';

    function __construct(string $status, string|stdClass|bool $content ) {
        $this->status = $status;
        $this->content = $content;
    }

    function send() : void {
        header('Content-Type: application/json');
        echo( json_encode( [
            'status' => $this->status,
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
