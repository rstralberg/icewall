<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../config.php';

function createSettings(mysqli $mysqli): void
{
    if (
        dbCreate(
            $mysqli,
            'settings',
            ['id', 'name', 'owner', 'logo', 'host'],
            [
                'INT(11) NOT NULL AUTO_INCREMENT',
                'VARCHAR(128) DEFAULT NULL',
                'VARCHAR(128) DEFAULT NULL',
                'VARCHAR(256) DEFAULT NULL',
                'VARCHAR(128) DEFAULT NULL'
            ]
        )
    ) {
        dbInsert($mysqli, 'settings', 
        [   'name', 'owner', 'logo', 'host'], [
            sqlString( $mysqli, DEFAULT_SITENAME),
            sqlString( $mysqli, DEFAULT_SITEOWNER),
            sqlString( $mysqli, DEFAULT_LOGO),
            sqlString( $mysqli, HOSTNAME)
        ]);
    }
}
function selectSettings(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'settings', ['id', 'name', 'owner', 'logo', 'host'], sqlName('id') . '=1');
}
function updateSettings(mysqli $mysqli, $values): int
{
    return dbUpdate($mysqli, 'settings', [ 'name', 'owner', 'logo', 'host'], $values, sqlName('id') . '=1');
}

?>