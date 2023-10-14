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
function createUser(Db $db): void
{

    if (
        $db->createTable(
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
        $db->addDefaultRow('user');
    }
}

function selectUser(Db $db, string $userName): array
{
    return $db->select( 'user', array_merge(['id'], UserCols),
     $db->name('username') . '=' . $db->string( $userName));
}

function selectUsers(Db $db): array
{
    return $db->select( 'user', array_merge(['id'], UserCols), 
        null, $db->name('username') . ' asc');
}

function insertUser(Db $db, $values): int
{
    return $db->insert( 'user', UserCols, $values);
}

function updateUser(Db $db, string $username, array $values): int
{
    $cols = array_values( array_diff(UserCols, array('username', 'password')) );
    return $db->update(
        'user',
        $cols,
        $values,
        $db->name('username') . '=' . $db->string( $username)
    );
}
function updatePassword(Db $db, string $username, string $password): void
{
    $db->update(
        'user',
        ['password'],
        [$db->string( password_hash($password, PASSWORD_DEFAULT))],
        $db->name('username') . '=' . $db->string( $username)
    );
}
function deleteUser(Db $db, $userName): void
{
    $db->delete( 'user', $db->name('username') . '=' . $db->string( $userName));
}

function verifyUser(Db $db, string $username, string $password): string
{
    $passwords = $db->select( 'user', ['password'], $db->name('username') . '=' . $db->string($username));
    if (!$passwords) {
        return '';
    }

    $users = selectUser($db, $username);
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

    $db = new Db($args->database);
    $db->open();

    deleteUser($db, $args->username);

    $db->close();

    return new Reply('ok', true);
}