<?php

require_once __DIR__ . '/../db/db.php';

function create_styles_table(mysqli $db, string $database): bool
{
    return db_create($db, $database, 'styles', [
        'theme',
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
        'shadows',
    ], [
        'VARCHAR(64) NOT NULL', // name
        'VARCHAR(32) NOT NULL', // name
        'VARCHAR(16) NOT NULL', // bg (#rrggbb)
        'VARCHAR(16)  NOT NULL', // fg (#rrggbb)
        'VARCHAR(16)  NOT NULL', // bgHi (#rrggbb)
        'VARCHAR(16)  NOT NULL', // fgHi (#rrggbb)
        'VARCHAR(16)  NOT NULL', // bgDis (#rrggbb)
        'VARCHAR(16)  NOT NULL', // fgDis (#rrggbb)
        'TINYINT NOT NULL', // borderSize (px)
        'VARCHAR(16)  NOT NULL', // borderColor (#rrggbb)
        'TINYINT NOT NULL', // borderRadius (px)
        'VARCHAR(64)  NOT NULL', // fontfam
        'FLOAT(5,2) NOT NULL', // fontsize (em)
        'VARCHAR(16)  NOT NULL', // fontweight (normal or bold)
        'VARCHAR(16)  NOT NULL', // fontstyle (normal or italic)
        'VARCHAR(16) NOT NULL', // height (vh)
        'VARCHAR(16) NOT NULL', // width
        'TINYINT NOT NULL', // shadows (0 or 1)
    ]);
}
