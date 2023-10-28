<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../config.php';

const StyleCols = [
    'name',
    'bg',
    'fg',
    'bgHi',
    'fgHi',
    'bgDis',
    'fgDis',
    'borderSize',
    'borderColor',
    'borderRadius',
    'fontfam',
    'fontsize',
    'fontweight',
    'fontstyle',
    'height',
    'width',
    'shadows'
];

function initializeStyles(Db $db): void
{
    if (
        $db->createTable('styles', StyleCols, [
            'VARCHAR(64) NOT NULL DEFAULT \'IceWall\' UNIQUE', // name
            'VARCHAR(16) NOT NULL DEFAULT \'#202020\'', // bg (#rrggbb)
            'VARCHAR(16)  NOT NULL DEFAULT \'#e0e0e0\'', // fg (#rrggbb)
            'VARCHAR(16)  NOT NULL DEFAULT \'#404040\'', // bgHi (#rrggbb)
            'VARCHAR(16)  NOT NULL DEFAULT \'#ffffff\'', // fgHi (#rrggbb)
            'VARCHAR(16)  NOT NULL DEFAULT \'#808080\'', // bgDis (#rrggbb)
            'VARCHAR(16)  NOT NULL DEFAULT \'#404040\'', // fgDis (#rrggbb)
            'TINYINT NOT NULL DEFAULT 2', // borderSize (px)
            'VARCHAR(16)  NOT NULL DEFAULT \'#ffffff\'', // borderColor (#rrggbb)
            'TINYINT NOT NULL DEFAULT 16', // borderRadius (px)
            'VARCHAR(64)  NOT NULL DEFAULT \'Arial\'', // fontfam
            'FLOAT(5,2) NOT NULL DEFAULT 1.0', // fontsize (em)
            'VARCHAR(16)  NOT NULL DEFAULT \'normal\'', // fontweight (normal or bold)
            'VARCHAR(16)  NOT NULL DEFAULT \'normal\'', // fontstyle (normal or italic)
            'TINYINT NOT NULL DEFAULT 10', // height (vh)
            'TINYINT NOT NULL DEFAULT 80', // width (%)
            'TINYINT NOT NULL DEFAULT 1' // shadows (0 or 1)
        ])
    ) {
        $db->addDefaultRow('styles');
    }
}

?>