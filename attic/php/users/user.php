<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../config.php';

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
// //}
