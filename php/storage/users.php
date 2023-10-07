<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../config.php';


function createUsers(mysqli $mysqli): void
{

    if (
        dbCreate(
            $mysqli,
            'users',
            [
                'id',
                'username',
                'fullname',
                'email',
                'picture',
                'password',
                'permPages',
                'permBlocks',
                'permUsers',
                'permThemes',
                'permSettings'
            ],
            [
                'INT(11) NOT NULL AUTO_INCREMENT',
                'VARCHAR(64) DEFAULT NULL',
                'VARCHAR(256) DEFAULT NULL',
                'VARCHAR(256) DEFAULT NULL',
                'VARCHAR(128) DEFAULT NULL',
                'VARCHAR(256) DEFAULT NULL',
                'TINYINT DEFAULT NULL',
                'TINYINT DEFAULT NULL',
                'TINYINT DEFAULT NULL',
                'TINYINT DEFAULT NULL',
                'TINYINT DEFAULT NULL'
            ]
        )
    ) {

        dbInsert($mysqli, 'users', [
            'username',
            'fullname',
            'email',
            'picture',
            'password',
            'permPages',
            'permBlocks',
            'permUsers',
            'permThemes',
            'permSettings'
        ], [
            sqlString( $mysqli, DEFAULT_USERNAME),
            sqlString( $mysqli, DEFAULT_FULLNAME),
            sqlString( $mysqli, DEFAULT_EMAIL),
            sqlString( $mysqli, DEFAULT_PICTURE),
            sqlString( $mysqli, password_hash(DEFAULT_PASSW, PASSWORD_DEFAULT)),
            sqlBoolean(true),
            sqlBoolean(true),
            sqlBoolean(true),
            sqlBoolean(true),
            sqlBoolean(true)
        ]); 
    }
}

function selectUser(mysqli $mysqli, string $userName): array
{
    return dbSelect($mysqli, 'users', [
        'id',
        'username',
        'fullname',
        'email',
        'picture',
        'permPages',
        'permBlocks',
        'permUsers',
        'permThemes',
        'permSettings'
    ], sqlName('username') . '=' . sqlString( $mysqli, $userName));
}

function selectUsers(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'users', [
        'id',
        'username',
        'fullname',
        'email',
        'picture',
        'permPages',
        'permBlocks',
        'permUsers',
        'permThemes',
        'permSettings'
        ], null, sqlName('username') . ' asc');
}

function insertUser(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'users', [
        'username',
        'fullname',
        'email',
        'picture',
        'password',
        'permPages',
        'permBlocks',
        'permUsers',
        'permThemes',
        'permSettings'
        ], $values);
}

function updateUser(mysqli $mysqli, string $username, array $values): int
{
    return dbUpdate(
        $mysqli,
        'users',
        [
            'fullname',
            'email',
            'picture',
            'permPages',
            'permBlocks',
            'permUsers',
            'permThemes',
            'permSettings'        ],
        $values,
        sqlName('username') . '=' . sqlString( $mysqli, $username)
    );
}

function updatePassword(mysqli $mysqli, string $username, string $password): void
{
    dbUpdate(
        $mysqli,
        'users',
        ['password'],
        [sqlString( $mysqli, password_hash($password, PASSWORD_DEFAULT))],
        sqlName('username') . '=' . sqlString( $mysqli, $username)
    );
}
function deleteUser(mysqli $mysqli, $userName): void
{
    dbDelete($mysqli, 'users', sqlName('username') . '=' . sqlString( $mysqli, $userName));
}

function verifyUser(mysqli $myscli, string $username, string $password): string
{
    $passwords = dbSelect($myscli, 'users', ['password'], sqlName('username').'='.sqlString( $myscli, $username));
    if( !$passwords ) {
        return '';
    }

    $users = selectUser($myscli, $username);
    if (!$users)
        return '';

    $user = $users[0];
    if (password_verify($password,rawurldecode($passwords[0]['password']))) {
        return json_encode($user);
    } else {
        return '';
    }
}