<?php

function create_sitefolders(array $site)
{

    $sitefolder = __DIR__ . '/../../public/sites/' . $site['key'];
    if (!file_exists($sitefolder)) {
        mkdir($sitefolder, 0777, true);
    }

    $assetsfolder = $sitefolder . '/assets';
    if (!file_exists($assetsfolder)) {
        mkdir($assetsfolder, 0777, true);
    }

    $sharedfolder = $sitefolder . '/shared';
    if (!file_exists($sharedfolder)) {
        mkdir($sharedfolder, 0777, true);
    }
    copy(__DIR__ . '/../../public/icons/avatar.png', $sharedfolder . '/avatar.png');

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
