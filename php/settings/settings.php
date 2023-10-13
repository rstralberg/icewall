<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';

const SettingsCols = [
        'name', 
    'owner', 
    'logo'
];

function createSettings(mysqli $mysqli): void
{
    if (
        dbCreate(
            $mysqli,
            'settings',
            array_merge(['id'], SettingsCols),
            [
                'INT(11) NOT NULL AUTO_INCREMENT',
                'VARCHAR(128) NOT NULL DEFAULT \''.DEFAULT_SITENAME.'\'',
                'VARCHAR(128) NOT NULL DEFAULT \''.DEFAULT_SITEOWNER.'\'',
                'VARCHAR(256) NOT NULL DEFAULT \''.DEFAULT_LOGO.'\''
            ]
        )
    ) {
        dbAddDefaultRow($mysqli, 'settings');
    }
}
function selectSettings(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'settings', array_merge(['id'], SettingsCols), sqlName('id') . '=1');
}
function updateSettings(mysqli $mysqli, $values): int
{
    return dbUpdate($mysqli, 'settings', SettingsCols, $values, sqlName('id') . '=1');
}

?>