<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../config.php';

function initializeTheme(Db $db): void
{
    if (
        $db->createTable('theme', [
            'name',
            'wCenter',
            'vGap',
            'hGap',
            'hTop',
            'hSub',
            'hBottom',
            'bg',
            'fg',
            'bgBars',
            'fgBars',
            'bgMenuHover',
            'fgMenuHover',
            'bgTitle',
            'fgTitle',
            'bgButton',
            'fgButton',
            'bgButtonHover',
            'fgButtonHover',
            'bgButtonDisabled',
            'fgButtonDisabled',
            'fgLink',
            'bgInput',
            'fgInput',
            'bgInputHover',
            'fgInputHover',
            'bgInputDisabled',
            'fgInputDisabled',
            'fzTop',
            'fzSub',
            'fzBottom',
            'fzButton',
            'fzInput',
            'fwTop',
            'fwSub',
            'fwBottom',
            'fwInput',
            'fwButton',
            'fsBottom',
            'font',
            'fontsize'
        ], [
            'VARCHAR(64) NOT NULL DEFAULT \'IceWall\' UNIQUE',
            // name
            'TINYINT NOT NULL DEFAULT 80',
            // wCenter (%)
            'TINYINT NOT NULL DEFAULT 20',
            // vGap (px)
            'TINYINT NOT NULL DEFAULT 30',
            // hGap (px)
            'FLOAT(5,2) NOT NULL DEFAULT 0.6',
            // hTop (fr)
            'FLOAT(5,2) NOT NULL DEFAULT 0.4',
            // hSub (fr)
            'FLOAT(5,2) NOT NULL DEFAULT 0.2',
            // hBottom (fr)
            'VARCHAR(16) NOT NULL DEFAULT \'#202020\'',
            // bg (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#e0e0e0\'',
            // fg (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#101010\'',
            // bgBars (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#ffffff\'',
            // fgBars (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#ff2020\'',
            // bgMenuHover (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#ffff20\'',
            // fgMenuHover (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#101010\'',
            // bgTitle (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#ff00ff\'',
            // fgTitle (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#101010\'',
            // bgButton (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#ffffff\'',
            // fgButton (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#ff2020\'',
            // bgButtonHover (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#20ffff\'',
            // fgButtonHover (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#808080\'',
            // bgButtonDisabled (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#202020\'',
            // fgButtonDisabled (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#808000\'',
            // fgLink (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#e0e0e0\'',
            // bgInput (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#000000\'',
            // fgInput (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#ffffff\'',
            // bgInputHover (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#000000\'',
            // fgInputHover (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#808080\'',
            // bgInputHover (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#202020\'',
            // fgInputHover (#rrggbb)
            'FLOAT(5,2) NOT NULL DEFAULT 1.2',
            // fzTop (em)
            'FLOAT(5,2)  NOT NULL DEFAULT 1.2',
            // fzSub (em)
            'FLOAT(5,2)  NOT NULL DEFAULT 0.8',
            // fzBottom (em)
            'FLOAT(5,2)  NOT NULL DEFAULT 1.1',
            // fzButton (em)
            'FLOAT(5,2)  NOT NULL DEFAULT 1.0',
            // fzInput (em)
            'VARCHAR(16) NOT NULL DEFAULT \'bold\'',
            // fwBottom (normal | bold )
            'VARCHAR(16) NOT NULL DEFAULT \'bold\'',
            // fwSub (normal | bold )
            'VARCHAR(16) NOT NULL DEFAULT \'normal\'',
            // fwBottom (normal | bold )
            'VARCHAR(16) NOT NULL DEFAULT \'bold\'',
            // fwInput (normal | bold )
            'VARCHAR(16) NOT NULL DEFAULT \'bols\'',
            // fwButton (normal | boldtalic)
            'VARCHAR(16) NOT NULL DEFAULT \'italic\'',
            // fsBottom (normal | italic)
            'VARCHAR(32) NOT NULL DEFAULT \'Ariel\'',
            // font family
            'FLOAT(5,2) NOT NULL DEFAULT 1.0'
            // fontsize (em)
        ]) // 
    ) {
        $db->addDefaultRow('theme');
    }
}


?>