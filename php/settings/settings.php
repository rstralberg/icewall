<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';

const SettingsCols = [
    'name', 
    'key',
    'owner', 
    'logo'
];

function selectSettings(Db $db): array
{
    return $db->select( 'settings', array_merge(['id'], SettingsCols), $db->name('id') . '=1');
}
function updateSettings(Db $db, $values): int
{
    return $db->update( 'settings', SettingsCols, $values, $db->name('id') . '=1');
}

?>