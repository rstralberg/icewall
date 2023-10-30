<?php

require_once __DIR__ . '/dbTable.php';
require_once __DIR__ . '/../config.php';

class dbStyles extends dbTable
{

    public function __construct()
    {parent::__construct('styles');}

    public function create(db $db): bool | string
    {

        if ($db->createTable($this->tableName, [
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
            'TINYINT NOT NULL', // height (vh)
            'TINYINT NOT NULL', // width (%)
            'TINYINT NOT NULL', // shadows (0 or 1)
        ])) {
            return true;
        } else {
            return $db->lastError();
        }

    }

    public static function defaultStyles(): array
    {
        return [
            ['app',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ],
            ['navbar',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]
            ,
            ['titlebar',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]
            ,
            ['center',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]
            ,
            ['footer',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]
            ,
            ['content',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]
            ,
            ['form',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]
            ,
            ['fields',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]
            ,
            ['button',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]
            ,
            ['title',
                '#202020', // bg (#rrggbb)
                '#ffffff', // fg (#rrggbb)
                '#202020', // bgHi (#rrggbb)
                '#ffffff', // fgHi (#rrggbb)
                '#202020', // bgDis (#rrggbb)
                '#ffffff', // fgDis (#rrggbb)
                0, // borderSize (px)
                '#202020', // borderColor (#rrggbb)
                0, // borderRadius (px)
                '"Ariel"', // fontfam ("string")
                1, // fontsize (em)
                'normal', // fontweight (normal | bold )
                'normal', // fontstyle (normal | italic)
                98, // height (vh)
                80, // width (%)
                0,
            ]];

    }
}
