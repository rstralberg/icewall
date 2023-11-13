<?php

require_once __DIR__ . '/../config.php';

function create_sitefolders(array $site)
{

    $sitefolder = __DIR__ . '/../../public/sites/' . $site['key'];
    if (!file_exists($sitefolder)) {
        mkdir($sitefolder, 0777, true);
    }

    $assetsfolder = $sitefolder . '/users';
    if (!file_exists($assetsfolder)) {
        mkdir($assetsfolder, 0777, true);
    }

    if (!file_exists($assetsfolder.'/org')) {
        mkdir($assetsfolder.'/org', 0777, true);
    }
    copy(__DIR__ . '/../../public/icons/avatar.png', $assetsfolder . '/org/avatar.png');

    if (!file_exists($assetsfolder.'/'. PC_SIZE)) {
        mkdir($assetsfolder.'/'. PC_SIZE, 0777, true);
    }
    copy(__DIR__ . '/../../public/icons/avatar.png', $assetsfolder . '/' . PC_SIZE . '/avatar.png');

    if (!file_exists($assetsfolder.'/'. PAD_SIZE)) {
        mkdir($assetsfolder.'/'. PAD_SIZE, 0777, true);
    }
    copy(__DIR__ . '/../../public/icons/avatar.png', $assetsfolder . '/' . PAD_SIZE . '/avatar.png');

    if (!file_exists($assetsfolder.'/'. MOBILE_SIZE)) {
        mkdir($assetsfolder.'/'. MOBILE_SIZE, 0777, true);
    }
    copy(__DIR__ . '/../../public/icons/avatar.png', $assetsfolder . '/' . MOBILE_SIZE . '/avatar.png');

    if (!file_exists($assetsfolder.'/'. THUMB_SIZE)) {
        mkdir($assetsfolder.'/'. THUMB_SIZE, 0777, true);
    }
    copy(__DIR__ . '/../../public/icons/avatar.png', $assetsfolder . '/' . THUMB_SIZE . '/avatar.png');

    $assetsfolder .= '/users';
    if (!file_exists($assetsfolder)) {
        mkdir($assetsfolder, 0777, true);
    }
    copy(__DIR__ . '/../../public/icons/avatar.png', $assetsfolder . '/avatar.png');


    $readme = $sitefolder . '/readme.txt';
    if (!file_exists($readme)) {
        $fh = fopen($readme, 'w');
        if ($fh) {
            fwrite($fh, PHP_EOL);
            fwrite($fh, '=====================================================================' . PHP_EOL);
            fwrite($fh, 'This is the root folder for ' . $site['title'] . PHP_EOL);
            fwrite($fh, 'Uploads for ' . $site['title'] . ' will got to the subfolders.' . PHP_EOL);
            fwrite($fh, PHP_EOL);
            fwrite($fh, 'Created by IceWall at ' . Date('Y-m-d H:i') . PHP_EOL);
            fwrite($fh, '=====================================================================' . PHP_EOL);
            fwrite($fh, 'Stralberg Development, rstralberg@pm.me' . PHP_EOL);
            fwrite($fh, '=====================================================================' . PHP_EOL);
            fwrite($fh, PHP_EOL);
            fflush($fh);
            fclose($fh);
        }
    }
}
