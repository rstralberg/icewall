<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../config.php';

function initializeUser(Db $db, string $email, string $logo): void
{

    if (
        $db->createTable(
            'user',
            [
                'username',
                'fullname',
                'email',
                'picture',
                'password'
            ],
            [
                'VARCHAR(64) NOT NULL DEFAULT \'admin\' UNIQUE',
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

?>
