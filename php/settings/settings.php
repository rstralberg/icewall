<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';

const SettingsCols = [
        'name', 
    'owner', 
    'logo'
];

function createSettings(Db $db): void
{
    if (
        $db->createTable(
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
        $db->addDefaultRow('settings');
    }
}
function selectSettings(Db $db): array
{
    return $db->select( 'settings', array_merge(['id'], SettingsCols), $db->name('id') . '=1');
}
function updateSettings(Db $db, $values): int
{
    return $db->update( 'settings', SettingsCols, $values, $db->name('id') . '=1');
}

?>