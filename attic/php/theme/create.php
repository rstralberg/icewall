<?php

// require_once __DIR__ . '/theme.php';

function createDefaultTheme(stdClass $args): Reply
{
    return new Reply(false,'');
}



//     $db = new db();
//     $db->open($args->database);

//     $theme = [

//         $db->string($args->themeName),
//         // theme
//         $db->string('#202020'),
//         // appBg
//         $db->string('#ffffff'),
//         // appFg
//         $db->string('Ariel'),
//         // appFont
//         $db->string('1em'),
//         // appFsize
//         $db->string('80vw'),
//         // appWidth
//         $db->string('8px'),
//         // appRadius
//         $db->string('icons/white'),
//         // appFolder
//         $db->string('#303030'),
//         // editBg
//         $db->string('#ffffff'),
//         // editFg
//         $db->string('#404040'),
//         // editActBg
//         $db->string('#ffffff'),
//         // editActFg
//         $db->string('#ffffff'),
//         // editBdFg
//         $db->string('1px'),
//         // editBdW
//         $db->string('#202020'),
//         // toolBg
//         $db->string('#ffffff'),
//         // toolFg
//         $db->string('#ff1010'),
//         // toolActBg
//         $db->string('#ffffff'),
//         // toolActFg
//         $db->string('#ffffff'),
//         // toolBdFg
//         $db->string('1px'),
//         // toolBdW
//         $db->bool(true),
//         // toolShadow
//         $db->string('#404040'),
//         // titleBg
//         $db->string('#ffff00'),
//         // titleFg
//         $db->string('#fff'),
//         // titleBdFg
//         $db->string('1px'),
//         // titleBdW
//         $db->bool(true),
//         // titleShadow'
//         $db->string('#101010'),
//         // barBg
//         $db->string('#ffffff'),
//         // barFg
//         $db->string('#ff2200'),
//         // barActBg
//         $db->string('#000000'),
//         // barActFg
//         $db->string('#ffffff'),
//         // barBdFg
//         $db->string('1px'),
//         // barBdW
//         $db->bool(true),
//         // barShadow
//         $db->string('#404040'),
//         // contentBg
//         $db->string('#ffffff'),
//         // contentFg
//         $db->string('#505050'),
//         // contentActBg
//         $db->string('#ffffff'),
//         // contentActFg
//         $db->string('#ffffff'),
//         // contentBdFg
//         $db->string('1px'),
//         // contentBdW
//         $db->bool(true),
//         // contentShadow
//         $db->string('#202020'),
//         // formBg
//         $db->string('#ffffff'),
//         // formFg
//         $db->string('#ffffff'),
//         // formBdFg
//         $db->string('2px'),
//         // formBdW
//         $db->bool(true),
//         // formShadow
//         $db->string('#082626'),
//         // btnBg
//         $db->string('#000000'),
//         // btnFg
//         $db->string('#088686'),
//         // btnActBg
//         $db->string('#000000'),
//         // btnActFg
//         $db->string('#000000'),
//         // btnBdFg
//         $db->string('1px'),
//         // btnBdW
//         $db->bool(true),
//         // btnShadow
//         $db->string('#ffffff'),
//         // inpBg
//         $db->string('#000000'),
//         // inpFg
//         $db->string('#ffffee'),
//         // inpActBg
//         $db->string('#000000'),
//         // inpActFg
//         $db->string('#000000'),
//         // inpBdFg
//         $db->string('1px'),
//         // inpBdW
//         $db->bool(true),
//         // inpShadow
//         $db->string('#000000'),
//         // linkBg
//         $db->string('#112244'),
//         // linkFg
//         $db->string('#4400ff'),
//         // linkActBg
//         $db->string('#550022'),
//         // linkActFg
//     ];

//     $id = insertTheme($db, $theme);
//     $lastError = $db->lastError();
//     $db->close();

//     if ($id > 0)
//         return new Reply(true, $id);
//     else
//         return new Reply(false, $lastError);
// }
?>