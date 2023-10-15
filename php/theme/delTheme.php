<?php

require_once __DIR__ . '/../utils/load.php';
require_once __DIR__ . '/theme.php';

function delTheme(stdClass $args): Reply
{

    $db = new Db($args->database);
    $db->open();
    $themeNames = '';
    $names = selectThemeNames($db);
    $db->close();

    if (!$names) {
        return new Reply('error', 'Det finns inga teman att radera längre');
    }

    if (count($names) === 1) {
        return new Reply('error', 'Det är inte tillåtet att radera det enda tema som finns');
    }

    foreach ($names as $name) {
        if ($name['name'] !== $args->theme) {
            $themeNames .= '<option class="theme-option" value="' . $name['name'] . '">' . $name['name'] . '</option>';
        }
    }

    return loadForm('theme/html/delete', [
        'themeNames' => $themeNames
    ]);
}

function themeDelete(stdClass $args) : Reply {

    $db = new Db($args->database);
    $db->open();

    deleteTheme($db, $args->name );
    $db->close();

    return new Reply('ok', true);

}

?>