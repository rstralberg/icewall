<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';

const UserCols = [
    'username',
    'fullname',
    'email',
    'picture',
    'password',
    'permPage',
    'permContent',
    'permUser',
    'permTheme',
    'permSettings'
];
function createUser(mysqli $mysqli): void
{

    if (
        dbCreate(
            $mysqli,
            'user',
            array_merge(['id'], UserCols),[
                'INT(11) NOT NULL AUTO_INCREMENT',
                'VARCHAR(64) NOT NULL DEFAULT \'' . DEFAULT_USERNAME . '\'',
                'VARCHAR(256) NOT NULL DEFAULT \'' . DEFAULT_FULLNAME . '\'',
                'VARCHAR(256) NOT NULL DEFAULT \'' . DEFAULT_EMAIL . '\'',
                'VARCHAR(128) NOT NULL DEFAULT \'' . DEFAULT_PICTURE . '\'',
                'VARCHAR(256) NOT NULL DEFAULT \'' . password_hash(DEFAULT_PASSW, PASSWORD_DEFAULT) . '\'',
                'TINYINT NOT NULL DEFAULT 1',
                'TINYINT NOT NULL DEFAULT 1',
                'TINYINT NOT NULL DEFAULT 1',
                'TINYINT NOT NULL DEFAULT 1',
                'TINYINT NOT NULL DEFAULT 1'
            ]
        )
    ) {
        dbAddDefaultRow($mysqli, 'user');
    }
}

function selectUser(mysqli $mysqli, string $userName): array
{
    return dbSelect($mysqli, 'user', array_merge(['id'], UserCols),
     sqlName('username') . '=' . sqlString($mysqli, $userName));
}

function selectUsers(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'user', array_merge(['id'], UserCols), 
        null, sqlName('username') . ' asc');
}

function insertUser(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'user', UserCols, $values);
}

function updateUser(mysqli $mysqli, string $username, array $values): int
{
    $cols = array_values( array_diff(UserCols, array('username', 'password')) );
    return dbUpdate(
        $mysqli,
        'user',
        $cols,
        $values,
        sqlName('username') . '=' . sqlString($mysqli, $username)
    );
}
function updatePassword(mysqli $mysqli, string $username, string $password): void
{
    dbUpdate(
        $mysqli,
        'user',
        ['password'],
        [sqlString($mysqli, password_hash($password, PASSWORD_DEFAULT))],
        sqlName('username') . '=' . sqlString($mysqli, $username)
    );
}
function deleteUser(mysqli $mysqli, $userName): void
{
    dbDelete($mysqli, 'user', sqlName('username') . '=' . sqlString($mysqli, $userName));
}

function verifyUser(mysqli $myscli, string $username, string $password): string
{
    $passwords = dbSelect($myscli, 'user', ['password'], sqlName('username') . '=' . sqlString($myscli, $username));
    if (!$passwords) {
        return '';
    }

    $users = selectUser($myscli, $username);
    if (!$users)
        return '';

    $user = $users[0];
    if (password_verify($password, rawurldecode($passwords[0]['password']))) {
        return json_encode($user);
    } else {
        return '';
    }
}

function _deleteUser(stdClass $args) : Reply {

    $mysqli = dbConnect();

    deleteUser($mysqli, $args->username);

    dbDisonnect($mysqli);

    return new Reply('ok', true);
}