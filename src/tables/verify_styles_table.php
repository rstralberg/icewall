<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/styles_table.php';

// returns true if table was created 
function verify_styles_table(mysqli $db, string $database): bool | string
{
    if (db_table_exist($db, $database, 'styles') === false) {
        return create_styles_table($db, $database);
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
            'borderSize' => 1, // borderSize (px)
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
            'bg' => '#303030', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#404040', // bgHi (#rrggbb)
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
            'height' => '2vh', // height 
            'width' => '80%', // width
            'shadows' => 1,
        ]
        ,
        [   'name' => 'form',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ffffff', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 2, // borderSize (px)
            'borderColor' => '#ffffff', // borderColor (#rrggbb)
            'borderRadius' => 16, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '30vh', // height 
            'width' => '60vw', // width 
            'shadows' => 1,
        ]
        ,
        [   'name' => 'fields',
            'bg' => '#e0e0e0', // bg (#rrggbb)
            'fg' => '#000000', // fg (#rrggbb)
            'bgHi' => '#ffffff', // bgHi (#rrggbb)
            'fgHi' => '#000000', // fgHi (#rrggbb)
            'bgDis' => '#808080', // bgDis (#rrggbb)
            'fgDis' => '#404040', // fgDis (#rrggbb)
            'borderSize' => 1, // borderSize (px)
            'borderColor' => '#ffffff', // borderColor (#rrggbb)
            'borderRadius' => 8, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '2vh', // height 
            'width' => 'auto', // width
            'shadows' => 1,
        ]
        ,
        [   'name' => 'button',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#EFC931', // bgHi (#rrggbb)
            'fgHi' => '#000000', // fgHi (#rrggbb)
            'bgDis' => '#808080', // bgDis (#rrggbb)
            'fgDis' => '#404040', // fgDis (#rrggbb)
            'borderSize' => 1, // borderSize (px)
            'borderColor' => '#202020', // borderColor (#rrggbb)
            'borderRadius' => 8, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1, // fontsize (em)
            'fontweight' => 'normal', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => '2vh', // height 
            'width' => '100px', // width 
            'shadows' => 1,
        ]
        ,
        [   'name' => 'title',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#e1c21a', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#e1c21a', // fgHi (#rrggbb)
            'bgDis' => '#202020', // bgDis (#rrggbb)
            'fgDis' => '#ffffff', // fgDis (#rrggbb)
            'borderSize' => 0, // borderSize (px)
            'borderColor' => '#202020', // borderColor (#rrggbb)
            'borderRadius' => 0, // borderRadius (px)
            'fontfam' => '"Ariel"', // fontfam ("string")
            'fontsize' => 1.3, // fontsize (em)
            'fontweight' => 'bold', // fontweight (normal | bold )
            'fontstyle' => 'normal', // fontstyle (normal | italic)
            'height' => 'auto', // height 
            'width' => 'auto', // width
            'shadows' => 1,
        ]
        ,
        [   'name' => 'sidebars',
            'bg' => '#202020', // bg (#rrggbb)
            'fg' => '#ffffff', // fg (#rrggbb)
            'bgHi' => '#202020', // bgHi (#rrggbb)
            'fgHi' => '#ff0000', // fgHi (#rrggbb)
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
