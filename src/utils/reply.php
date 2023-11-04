<?php

function send_reply(bool $ok, string|stdClass|bool $content): void
{
    header('Content-Type: application/json');
    try {

        $out = json_encode([
            'ok' => $ok,
            'content' => $content
        ]);
    } catch (Exception $ex) {
        echo (json_encode([
            'ok' => false,
            'content' => $ex->getMessage()
        ]));
        return;
    }
    echo ($out);
}

function verify_request(stdClass $args): bool
{
    if (verify_request_arg($args, 'key') === false) return false;
    if (verify_request_arg($args, 'func') === false) return false;
    return true;
}

function verify_request_arg(stdClass $args, string $arg): bool
{
    if (!isset($args->$arg)) {
        send_reply(false, 'Request "' . $arg . '" is missing');
        return false;
    } else return true;
}
