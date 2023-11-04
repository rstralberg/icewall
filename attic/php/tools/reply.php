<?php

function sendReply(bool $ok, string|stdClass|bool $content): void
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

function verifyRequest(stdClass $args): bool
{
    if (verifyRequestArg($args, 'key') === false) return false;
    if (verifyRequestArg($args, 'func') === false) return false;
    return true;
}

function verifyRequestArg(stdClass $args, string $arg): bool
{
    if (!isset($args->$arg)) {
        sendReply(false, 'Request "' . $arg . '" is missing');
        return false;
    } else return true;
}
