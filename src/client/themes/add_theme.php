<?php

require_once __DIR__ . '/../../db/db.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, ['theme'])) {

    $db = db_open($args->key);

    $res = db_insert($db, 'themes', [
        'name',
        'font',

        'headerT',
        'headerH',
        'footerB',
        'footerH',
        'titleH',
        'menuW',
        'infoW',
        'titleW',
        'contentW',
        'contentD',

        'radius',
        'linkFg',
        'appBg',

        'barsBg',
        'barsFg',
        'barsBorder',
        'barsShadow',

        'tbarBold',
        'tbarItalic',
        'tbarFsize',

        'nbarBold',
        'nbarItalic',
        'nbarFsize',
        'nbarBgHi',
        'nbarFgHi',

        'fbarBold',
        'fbarItalic',
        'fbarFsize',

        'contBg',
        'contFg',
        'contBorder',
        'contShadow',

        'formBg',
        'formFg',
        'formBorder',
        'formShadow',

        'btnH',
        'btnBg',
        'btnFg',
        'btnBgHi',
        'btnFgHi',
        'btnBgDis',
        'btnFgDis',
        'btnBold',
        'btnItalic',
        'btnFsize',
        'btnShadow',
        'btnBorder',

        'inpH',
        'inpBg',
        'inpFg',
        'inpBgHi',
        'inpFgHi',
        'inpBgDis',
        'inpFgDis',
        'inpBold',
        'inpItalic',
        'inpFsize',
        'inpShadow',
        'inpBorder',

        'markBg',
        'markFg',
        'markBorder',
        'markShadow',
        'markFsize',
        'markBold',
        'markItalic'],
        [
            $args->theme->name,
            $args->theme->font,

            $args->theme->headerT,
            $args->theme->headerH,
            $args->theme->footerB,
            $args->theme->footerH,
            $args->theme->titleH,
            $args->theme->menuW,
            $args->theme->infoW,
            $args->theme->titleW,
            $args->theme->contentW,
            $args->theme->contentD,

            $args->theme->radius,
            $args->theme->linkFg,
            $args->theme->appBg,

            $args->theme->barsBg,
            $args->theme->barsFg,
            $args->theme->barsBorder,
            $args->theme->barsShadow,

            $args->theme->tbarBold,
            $args->theme->tbarItalic,
            $args->theme->tbarFsize,

            $args->theme->nbarBold,
            $args->theme->nbarItalic,
            $args->theme->nbarFsize,
            $args->theme->nbarBgHi,
            $args->theme->nbarFgHi,

            $args->theme->fbarBold,
            $args->theme->fbarItalic,
            $args->theme->fbarFsize,

            $args->theme->contBg,
            $args->theme->contFg,
            $args->theme->contBorder,
            $args->theme->contShadow,

            $args->theme->formBg,
            $args->theme->formFg,
            $args->theme->formBorder,
            $args->theme->formShadow,

            $args->theme->btnH,
            $args->theme->btnBg,
            $args->theme->btnFg,
            $args->theme->btnBgHi,
            $args->theme->btnFgHi,
            $args->theme->btnBgDis,
            $args->theme->btnFgDis,
            $args->theme->btnBold,
            $args->theme->btnItalic,
            $args->theme->btnFsize,
            $args->theme->btnShadow,
            $args->theme->btnBorder,

            $args->theme->inpH,
            $args->theme->inpBg,
            $args->theme->inpFg,
            $args->theme->inpBgHi,
            $args->theme->inpFgHi,
            $args->theme->inpBgDis,
            $args->theme->inpFgDis,
            $args->theme->inpBold,
            $args->theme->inpItalic,
            $args->theme->inpFsize,
            $args->theme->inpShadow,
            $args->theme->inpBorder,

            $args->theme->markBg,
            $args->theme->markFg,
            $args->theme->markBorder,
            $args->theme->markShadow,
            $args->theme->markFsize,
            $args->theme->markBold,
            $args->theme->markItalic,

        ]);

    if ($res === false) {
        send_reject('Misslyckade med att spara nytt tema');
    } else if (gettype($res) === 'string') {
        send_reject($res);
    } else {
        send_resolve(true);
    }
}
