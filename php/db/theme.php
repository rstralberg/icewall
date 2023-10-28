<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/styles.php';

function initializeTheme(Db $db): void
{
    if (
        $db->createTable('theme', [
            'name',
            'wCenter',
            'vGap',
            'hGap',
            'idApp',
            'idTop',
            'idSub',
            'idCenter',
            'idSections',
            'idBottom',
            'idForms',
            'idButtons',
            'idFields',
            'idTitles'
        ], [
            'VARCHAR(64) NOT NULL DEFAULT \'IceWall\' UNIQUE',// name
            'TINYINT NOT NULL DEFAULT 80',// wCenter (%)
            'TINYINT NOT NULL DEFAULT 20',// vGap (px)
            'TINYINT NOT NULL DEFAULT 30',// hGap (px)
            'TINYINT NOT NULL DEFAULT 0',// idApp
            'TINYINT NOT NULL DEFAULT 0',// topId
            'TINYINT NOT NULL DEFAULT 0',// sibId
            'TINYINT NOT NULL DEFAULT 0',// centerId
            'TINYINT NOT NULL DEFAULT 0',// sectionsId
            'TINYINT NOT NULL DEFAULT 0',// bottomId
            'TINYINT NOT NULL DEFAULT 0',// formsId
            'TINYINT NOT NULL DEFAULT 0',// buttonsId
            'TINYINT NOT NULL DEFAULT 0',// fieldsId
            'TINYINT NOT NULL DEFAULT 0'// idTitles
        ])
    ) {
        $themeId = $db->addDefaultRow('theme');
        $theme = $db->select('theme', ['*'], $db->name('id') . '=' . $themeId)[0];

        initializeStyles($db);

        $theme['idApp'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-app'),// name (string)
            $db->string('#101010'),// bg (#rrggbb)
            $db->string('#ffffff'),// fg (#rrggbb)
            $db->string('#C20000'),// bgHi (#rrggbb)
            $db->string('#FFE020'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1,// fontsize (em)
            $db->string('normal'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            6,// height (vh)
            80,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $theme['idTop'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-top'),// name (string)
            $db->string('#000000'),// bg (#rrggbb)
            $db->string('#ffffff'),// fg (#rrggbb)
            $db->string('#C20000'),// bgHi (#rrggbb)
            $db->string('#FFE020'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1.5,// fontsize (em)
            $db->string('normal'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            8,// height (vh)
            80,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $theme['idSub'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-sub'),
            $db->string('#000000'),// bg (#rrggbb)
            $db->string('#e0d030'),// fg (#rrggbb)
            $db->string('#C20000'),// bgHi (#rrggbb)
            $db->string('#FFE020'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1.6,// fontsize (em)
            $db->string('bold'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            6,// height (vh)
            80,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $theme['idCenter'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-center'),
            $db->string('#101010'),// bg (#rrggbb)
            $db->string('#ffffff'),// fg (#rrggbb)
            $db->string('#C20000'),// bgHi (#rrggbb)
            $db->string('#FFE020'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1,// fontsize (em)
            $db->string('normal'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            74,// height (vh)
            80,// width (%)
            0// shadows ( 0 | 1 )
        ]);

        $theme['idSections'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-sections'),
            $db->string('#303030'),// bg (#rrggbb)
            $db->string('#ffffff'),// fg (#rrggbb)
            $db->string('#404040'),// bgHi (#rrggbb)
            $db->string('#ffffff'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1,// fontsize (em)
            $db->string('normal'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            6,// height (vh)
            80,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $theme['idBottom'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-bottom'),
            $db->string('#000000'),// bg (#rrggbb)
            $db->string('#ffffff'),// fg (#rrggbb)
            $db->string('#000000'),// bgHi (#rrggbb)
            $db->string('#ffffff'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1,// fontsize (em)
            $db->string('normal'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            4,// height (vh)
            80,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $theme['idForms'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-forms'),
            $db->string('#101010'),// bg (#rrggbb)
            $db->string('#ffffff'),// fg (#rrggbb)
            $db->string('#C20000'),// bgHi (#rrggbb)
            $db->string('#FFE020'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1,// fontsize (em)
            $db->string('normal'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            6,// height (vh)
            80,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $theme['idButtons'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-buttons'),
            $db->string('#000000'),// bg (#rrggbb)
            $db->string('#ffffff'),// fg (#rrggbb)
            $db->string('#A08030'),// bgHi (#rrggbb)
            $db->string('#FFE020'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1.2,// fontsize (em)
            $db->string('bold'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            4,// height (vh)
            60,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $theme['idFields'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-fields'),
            $db->string('#101010'),// bg (#rrggbb)
            $db->string('#ffffff'),// fg (#rrggbb)
            $db->string('#eeeeee'),// bgHi (#rrggbb)
            $db->string('#101010'),// fgHi (#rrggbb)
            $db->string('#808080'),// bgDis (#rrggbb)
            $db->string('#404040'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1,// fontsize (em)
            $db->string('bold'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            2,// height (vh)
            80,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $theme['idTitles'] = $db->insert('styles', StyleCols, [
            $db->string('icewall-titles'),
            $db->string('#A08030'),// bg (#rrggbb)
            $db->string('#FFFFFF'),// fg (#rrggbb)
            $db->string('#A08030'),// bgHi (#rrggbb)
            $db->string('#FFFFFF'),// fgHi (#rrggbb)
            $db->string('#A08030'),// bgDis (#rrggbb)
            $db->string('#FFFFFF'),// fgDis (#rrggbb)
            2,// borderSize (px)
            $db->string('#ffffff'),// borderColor (#rrggbb)
            16,
            $db->string('Arial'),// fontfam (string)
            1.3,// fontsize (em)
            $db->string('bold'),// fontweight (normal | bold)
            $db->string('normal'),// fontstyle (normal | italic )
            5,// height (vh)
            80,// width (%)
            1// shadows ( 0 | 1 )
        ]);

        $db->update(
            'theme',
            [
                'idApp',
                'idTop',
                'idSub',
                'idCenter',
                'idSections',
                'idBottom',
                'idForms',
                'idButtons',
                'idFields',
                'idTitles',
            ],
            [
                $theme['idApp'],
                $theme['idTop'],
                $theme['idSub'],
                $theme['idCenter'],
                $theme['idSections'],
                $theme['idBottom'],
                $theme['idForms'],
                $theme['idButtons'],
                $theme['idFields'],
                $theme['idTitles'],
            ],
            $db->name('id') . '=' . $theme['id']);
    }
}

function themeName2id(string $name): string {

    switch ($name) {
        case 'App': return 'idApp';
        case 'Menu': return 'idTop';
        case 'Title': return 'idSub';
        case 'Center': return 'idCenter';
        case 'Section': return 'idSections';
        case 'Bottom': return 'idBottom';
        case 'Form': return 'idForms';
        case 'Buttons':return 'idButtons';
        case 'Fields':return 'idFields';
        case 'Titles':return 'idTitles';
        default: die( 'Inknown theme field "' . $name . '" requested!');
    }
}



?>