<?php

require_once __DIR__ . '/../tools/loadForm.php';
// require_once __DIR__ . '/theme.php';

function delTheme(stdClass $args): Reply
{

    // $db = new db();
    // $db->open($args->database);
    // $themeNames = '';
    // $names = selectThemeNames($db);
    // $db->close();

    // if (!$names) {
    //     return new Reply(false,'Inga teman finns att radera');
    // }

    // if (count($names) === 1) {
    //     return new Reply(false, 'Det är inte tillåtet att radera alla teman');
    // }

    // foreach ($names as $name) {
    //     if ($name['name'] !== $args->theme) {
    //         $themeNames .= '<option class="theme-option" value="' . $name['name'] . '">' . $name['name'] . '</option>';
    //     }
    // }

    // return loadForm('theme/html/delete', [
    //     'themeNames' => $themeNames
    // ]);
    return new Reply(false,'');
}

function themeDelete(stdClass $args) : Reply {

    // $db = new db();
    // $db->open($args->database);

    // deleteTheme($db, $args->name );
    // $db->close();

    // return new Reply(true,'');
    return new Reply(false,'');

}

?>