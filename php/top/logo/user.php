<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../config.php';

const UserCols = [
    'username',
    'fullname',
    'email',
    'picture',
    'password'
];
function createUser(Db $db, string $username, string $email, string $logo): void
{

    if (
        $db->createTable(
            'user',
            [
                'id',
                'username',
                'fullname',
                'email',
                'picture',
                'password'
            ],
            [
                'INT(11) NOT NULL AUTO_INCREMENT',
                'VARCHAR(64) NOT NULL DEFAULT \'admin\'',
                'VARCHAR(256) NOT NULL DEFAULT \'Administrator\'',
                'VARCHAR(256) NOT NULL DEFAULT \'' . $email . '\'',
                'VARCHAR(128) NOT NULL DEFAULT \'' . $logo . '\'',
                'VARCHAR(256) NOT NULL DEFAULT \'' . password_hash('winterfall', PASSWORD_DEFAULT) . '\''
            ]
        )
    ) {
        $db->addDefaultRow('user');
    }
}
function updateUser(stdClass $args): Reply
{

    $db = new Db($args->database);
    $db->open();

    if ($args->password && strlen($args->password) > 7) {
        $res = $db->update(
            'user',
            ['fullname', 'email', 'picture', 'password'],
            [
                $db->string($args->fullname),
                $db->string($args->email),
                $db->string($args->picture),
                $db->string(password_hash($args->password, PASSWORD_DEFAULT))
            ],
            $db->name('username') . '=' . $db->string($args->username)
        );
    } else {

        $res = $db->update(
            'user',
            ['fullname', 'email', 'picture'],
            [
                $db->string($args->fullname),
                $db->string($args->email),
                $db->string($args->picture)
            ],
            $db->name('username') . '=' . $db->string($args->username)
        );
    }
    $lastError = $db->lastError();
    $db->close();
    if ($res)
        return new Reply(true, '');
    else
        return new Reply(false, '#' . $lastError);
}
function deleteUser(stdClass $args): Reply
{

    $db = new Db($args->database);
    $db->open();

    // check if we can remove the user picture
    $users = $db->select('user', ['picture'], $db->name('username') . '=' . $db->string($args->username));
    if ($users) {
        $user = $users[0];
        $picture = $user['picture'];
        $users = $db->select('user', ['picture']);
        $count = 0;
        for ($i = 0; $i < count($users); $i++) {
            $user = $users[$i];
            if ($user['picture'] == $picture) {
                $count++;
            }
        }
        if ($count == 1) {
            unlink(__DIR__ . '/../../public/sites/' . $args->key . '/images/' . $picture);
        }
    }

    $res = $db->delete(
        'user',
        $db->name('username') . '=' . $db->string($args->username)
    );
    $lastError = $db->lastError();
    $db->close();
    if ($res)
        return new Reply(true, $args->username);
    else
        return new Reply(false, '#' . $lastError);
}
function addUser(stdClass $args): Reply
{

    $db = new Db($args->database);
    $db->open();

    $users = $db->select('user', ['id'], $db->name('username') . '=' . $db->string($args->username));
    if ($users) {
        $db->close();
        return new Reply(false, $args->username . ' finns redan. Välj ett annat användarnamn');
    }


    $res = $db->insert('user', [
        'username',
        'fullname',
        'email',
        'picture',
        'password'
    ], [
        $db->string($args->username),
        $db->string($args->fullname),
        $db->string($args->email),
        $db->string($args->picture),
        $db->string(password_hash($args->password, PASSWORD_DEFAULT)),
    ]);
    $lastError = $db->lastError();
    $db->close();
    if ($res) {
        // if no image is selected we are using 'icons/avatar.png'
        $picPath = __DIR__ . '/../../public/sites/' . $args->key . '/images/' . $args->picture;
        if (!file_exists($picPath)) {
            copy(__DIR__ . '/../../public/icons/avatar.png', __DIR__ . '/../../public/sites/' . $args->key . '/images/avatar.png');
        }
        return new Reply(true, '');
    } else
        return new Reply(false, '#' . $lastError);
}
function getUser(stdClass $args): Reply
{
    if ($args === null)
        return new Reply(false, '#' . 'getUser anropades utan argument');
    if ($args->database === null)
        return new Reply(false, '#' . 'getUser anropades utan info om databas');
    if ($args->username === null)
        return new Reply(false, '#' . 'getUser anropades utan info om användare');

    $db = new Db($args->database);
    $db->open();

    $res = $db->select(
        'user',
        [
            'username',
            'fullname',
            'email',
            'picture'
        ],
        $db->name('username') . '=' . $db->string($args->username)
    );
    $lastError = $db->lastError();
    $db->close();
    if ($res)
        return new Reply(true, json_encode($res[0]));
    else
        return new Reply(false, '#' . $lastError);
}
function getUserNames(stdClass $args): Reply
{
    $db = new Db($args->database);
    $db->open();

    $res = $db->select('user', ['username'], null, $db->name('username') . ' asc');
    $lastError = $db->lastError();
    $db->close();
    if ($res)
        return new Reply(true, json_encode($res));
    else
        return new Reply(false,'#' .  $lastError);
}
function changePassword(stdClass $args): Reply
{

    $db = new Db($args->database);
    $db->open();

    $res = $db->update(
        'user',
        ['password'],
        [$db->string(password_hash($args->password, PASSWORD_DEFAULT))],
        $db->name('username') . '=' . $db->string($args->username)
    );
    $lastError = $db->lastError();
    $db->close();
    if ($res)
        return new Reply(true, '');
    else
        return new Reply(false, '#' . $lastError);

}
function verifyUser(stdClass $args): Reply
{

    $db = new Db($args->database);
    $db->open();

    $users = $db->select('user', ['password'], $db->name('username') . '=' . $db->string($args->username));
    if (!$users) {
        $db->close();
        return new Reply(false, 'Användaren "' . $args->username . '" finns inte');
    }
    $user = $users[0];
    $res = password_verify($args->password, $user['password']);
    if ($res) {
        $users = $db->select(
            'user',
            [
                'username',
                'fullname',
                'email',
                'picture'
            ],
            $db->name('username') . '=' . $db->string($args->username)
        );
        if (!$users) {
            return new Reply(false, 'Kunde inte läsa info om användaren');
        }
        $user = $users[0];
        $db->close();
        return new Reply(true, json_encode($user));
    } else {
        return new Reply(false, 'Felaktigt lösenord');
    }
}
