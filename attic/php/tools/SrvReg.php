<?php

require_once __DIR__ . '/Reply.php';
require_once __DIR__ . '/load_html.php';

class SrvReq
{
    private $what;
    private $key;
    public $args;

    function __construct(stdClass $args)
    {
        if (!isset($this->args->key)) return 'SrvReq: "key" is missing';
        if (!isset($this->args->what)) return 'SrvReq: "what" is missing';
        $this->key = $args->key;
        $this->what = $args->what;
        $this->args = $args->args;
    }

    function verifyArgs(array $argNames = []): string | null
    {
        foreach ($argNames as $argname) {
            if (!isset($this->args->$argname)) return 'SrvReq: "' . $argname . '" is missing';
        }
        return null;
    }

    // function execute(): void
    // {
    //     if (!function_exists($this->what)) {
    //         $reply = new Reply(false,  'Funktionen "' . $this->what . '" finns inte på servern');
    //         $reply->send();
    //     } else {
    //         $func = $this->what;
    //         $reply = $func($this);
    //         $reply->send();
    //     }
    // }
}
