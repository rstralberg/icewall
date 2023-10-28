<?php

require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../config.php';

function initializePage(Db $db): void
{

    if (
        $db->createTable('page', [
            'title',
            'parentId',
            'isParent',
            'author',
            'showTitle',
            'pos',
            'public',
            'wContent',
            'dCenter',
            'rRoundness',
            'shadows',
            'imgShadows',
            'borderColor',
            'borderWidth',
            'bgCenter',
            'bgCenterActive',
            'fgCenter',
            'fzCenter',
        ], [
            'VARCHAR(60) NOT NULL DEFAULT \'Start\' UNIQUE',
            // title
            'INT(11) NOT NULL DEFAULT 0',
            // pageId
            'TINYINT NOT NULL DEFAULT 0',
            // isParent
            'VARCHAR(120) NOT NULL DEFAULT \'' . DEFAULT_USERNAME . '\'',
            // author
            'TINYINT NOT NULL DEFAULT 1',
            // showTitle
            'TINYINT NOT NULL DEFAULT 0',
            // pos
            'TINYINT NOT NULL DEFAULT 1',
            // public
            'TINYINT NOT NULL DEFAULT 80',
            // wContent (%)
            'TINYINT NOT NULL DEFAULT 3',
            // dCenter (vh)
            'TINYINT NOT NULL DEFAULT 16',
            // rRoundness (px)
            'TINYINT NOT NULL DEFAULT 1',
            // shadows (0 or 1)
            'TINYINT NOT NULL DEFAULT 1',
            // imgShadows (0 or 1)
            'VARCHAR(16) NOT NULL DEFAULT \'#ffffff\'',
            // borderColor
            'TINYINT NOT NULL DEFAULT 2',
            // borderWidth (px)
            'VARCHAR(16) NOT NULL DEFAULT \'#303030\'',
            // bgCenter (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#404040\'',
            // bgCentereActive (#rrggbb)
            'VARCHAR(16) NOT NULL DEFAULT \'#ffffff\'',
            // fgCenter (#rrggbb)
            'FLOAT(5,2)  NOT NULL DEFAULT 1.2',
            // fzCenter (em)

        ])
    ) {
        $db->addDefaultRow('page');
    }
}

?>