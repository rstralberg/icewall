<?php

require_once __DIR__ . '/loadForm.php';

function popup(stdClass $args) : void {

    loadForm(__DIR__ . '/popup', [
        'title' => $args->title,
        'msg' => $args->message

    ]);
}
?>
