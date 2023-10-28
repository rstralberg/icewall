<?php

require_once __DIR__ . '/reply.php';
require_once __DIR__ . '/../db/db.php';

function sql(stdClass $args): Reply
{
    $argErr = argError('sql', $args, [
        'table' => $args->table,
        'command' => $args->command,
    ]);
    if ($argErr)
        return $argErr;

    $db = new Db($args->database);
    $db->open();

    $reply = new Reply(false, '#' . 'Uknown SQL command "' . $args->command . '"');
    switch ($args->command) {
        case 'insert':
            $reply = sqlInsert($db, $args);
            break;
        case 'update':
            $reply = sqlUpdate($db, $args);
            break;
        case 'delete':
            $reply = sqlDelete($db, $args);
            break;
        case 'select':
            $reply = sqlSelect($db, $args);
            break;
        default:
            $db->close();
            return new Reply(false,'#' .  'Uknown SQL command "' . $args->command . '"');
    }
    $db->close();

    return $reply;
}

function sqlInsert(Db $db, stdClass $args): Reply
{
    $argErr = argError('sqlInsert', $args, [
        'cols' => $args->cols,
        'values' => $args->values,
    ]);
    if ($argErr) return $argErr;

    $res = $db->insert($args->table, $args->cols, $args->values);
    $lastError = $db->lastError();

    $restype = gettype($res);
    if ($restype === 'boolean')
        return new Reply(false, '#' . $lastError);

    if ($restype === 'string')
        return new Reply(false, '#' . $res);

    if ($restype === 'integer') {
        if ($res && $res > 0)
            return new Reply(true, $res);
    }
    return new Reply(false, '#' . $lastError);
}

function sqlUpdate(Db $db, stdClass $args): Reply
{
    $argErr = argError('sqlUpdate', $args, [
        'cols' => $args->cols,
        'values' => $args->values,
        'where' => $args->where
    ]);
    if ($argErr)
        return $argErr;

    $res = $db->update($args->table, $args->cols, $args->values, $args->where);
    $lastError = $db->lastError();

    if ($res)
        return new Reply(true, json_encode($res));
    else
        return new Reply(false, '#' . $lastError);
}

function sqlDelete(Db $db, stdClass $args): Reply
{
    $argErr = argError('sqlDelete', $args, [
        'where' => $args->where
    ]);
    if ($argErr)
        return $argErr;

    $res = $db->delete($args->table, $args->where);
    $lastError = $db->lastError();

    if ($res)
        return new Reply(true, '');
    else
        return new Reply(false, '#' . $lastError);
}

function sqlSelect(Db $db, stdClass $args): Reply
{
    $argErr = argError('sqlDelete', $args, [
        'cols' => $args->cols,
        'where' => $args->where,
        'single' => $args->single
    ]);
    if ($argErr)
        return $argErr;

    $argErr = argError('sqlUpdate', $args, [
        'cols' => $args->cols,
        'where' => $args->where
    ]);
    if ($argErr)
        return $argErr;

    $res = $db->select($args->table, $args->cols, $args->where, isset($args->order) ? $args->order : null);
    $lastError = $db->lastError();

    if ($res)
        return new Reply(true, $args->single ? json_encode($res[0]) : json_encode($res));
    else
        return new Reply(false,'#' .  $lastError);
}
?>