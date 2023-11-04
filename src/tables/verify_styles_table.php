<?php

require_once __DIR__ . '/../db/db.php';

// returns true if table was created 
function verify_styles_table(mysqli $db, string $database): bool | string
{
    if (db_table_exist($db, $database, 'styles') === false) {
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
    return false;

}

function get_default_styles(): array
{
    return [
        [   'name' => 'app',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 0, // borderSize (px)
            'borderColor' => '#202020', // borderColor (#rrggbb)
            'borderRadius' => 0, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '98vh', // height 
            'width' => '80%', // width 
            'shadows' => 0,
        ],
        [   'name' => 'navbar',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 1, // borderSize (px)
            'borderColor' => '#ffffff', // borderColor (#rrggbb)
            'borderRadius' => 16, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '6vh', // height 
            'width' => '80vw', // width 
            'shadows' => 1,
        ]
        ,
        [   'name' => 'titlebar',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 1, // borderSize (px)
            'borderColor' => '#ffffff', // borderColor (#rrggbb)
            'borderRadius' => 16, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '4vh', // height
            'width' => '80vw', // width 
            'shadows' => 1,
        ]
        ,
        [   'name' => 'page',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 0, // borderSize (px)
            'borderColor' => '#ffffff', // borderColor (#rrggbb)
            'borderRadius' => 16, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '84vh', // height 
            'width' => '80vw', // 
            'shadows' => 1,
        ]
        ,
        [   'name' => 'footer',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 1, // borderSize (px)
            'borderColor' => '#ffffff', // borderColor (#rrggbb)
            'borderRadius' => 16, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '4vh', // height 
            'width' => '80vw', // width 
            'shadows' => 1,
        ]
        ,
        [   'name' => 'content',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 0, // borderSize (px)
            'borderColor' => '#202020', // borderColor (#rrggbb)
            'borderRadius' => 0, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '6vh', // height 
            'width' => '80%', // width
            'shadows' => 0,
        ]
        ,
        [   'name' => 'form',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 0, // borderSize (px)
            'borderColor' => '#202020', // borderColor (#rrggbb)
            'borderRadius' => 0, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => 'auto', // height 
            'width' => 'auto', // width 
            'shadows' => 0,
        ]
        ,
        [   'name' => 'fields',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 1, // borderSize (px)
            'borderColor' => '#202020', // borderColor (#rrggbb)
            'borderRadius' => 8, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '2vh', // height 
            'width' => 'auto', // width
            'shadows' => 0,
        ]
        ,
        [   'name' => 'button',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#EFC931', // bgHi (#rrggbb)
            'fgHi' => '#000000', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 1, // borderSize (px)
            'borderColor' => '#202020', // borderColor (#rrggbb)
            'borderRadius' => 8, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '2vh', // height 
            'width' => '100px', // width 
            'shadows' => 0,
        ]
        ,
        [   'name' => 'title',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 0, // borderSize (px)
            'borderColor' => '#202020', // borderColor (#rrggbb)
            'borderRadius' => 0, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => 'auto', // height 
            'width' => 'auto', // width
            'shadows' => 0,
        ]
        ,
        [   'name' => 'sidebars',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 0, // borderSize (px)
            'borderColor' => '#ffffff', // borderColor (#rrggbb)
            'borderRadius' => 16, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '80%', // height 
            'width' => '10vw', // width
            'shadows' => 0,
        ]];

}
