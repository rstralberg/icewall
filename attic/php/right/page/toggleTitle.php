<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../tools/reply.php';

function hidePageTitle(stdClass $args): Reply
{
    $argErr = argError('hidePageTitle', $args, [
        'pageId' => $args->pageId
    ]);
    if ($argErr)
        return $argErr;

    $db = new db();
    $db->open($args->database);

    $res = $db->update('page', ['showTitle'], [0], $db->name('id') . '=' . $args->pageId);
    $lastError = $db->lastError();
    $db->close();
    if ($res)
        return new Reply(true, '');
    else
        return new Reply(false, '#' . $lastError);
}

function showPageTitle(stdClass $args): Reply
{

    $argErr = argError('showPageTitle', $args, [
        'pageId' => $args->pageId
    ]);
    if ($argErr)
        return $argErr;

    $db = new db();
    $db->open($args->database);

    $res = $db->update('page', ['showTitle'], [1], $db->name('id') . '=' . $args->pageId);
    $lastError = $db->lastError();
    $db->close();
    if ($res)
        return new Reply(true, '');
    else
        return new Reply(false, '#' . $lastError);
}

