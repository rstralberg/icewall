<?php

require_once __DIR__ . '/../db/db.php';

function create_users_table(mysqli $db, string $database): bool
{
    return db_create($db, $database, 'users', [
        'username',
        'fullname',
        'email',
        'picture',
        'password',
    ],
        [
            'VARCHAR(64) NOT NULL UNIQUE',
            'VARCHAR(256) NOT NULL',
            'VARCHAR(256) NOT NULL',
            'VARCHAR(128) NOT NULL',
            'VARCHAR(256) NOT NULL',
        ]);
}
