<?php

require_once __DIR__ . '/../../utils/load_form.php';
require_once __DIR__ . '/../../utils/send_reply.php';
require_once __DIR__ . '/../../utils/verify_client_args.php';

if (verify_client_args($args, [])) {

     send_resolve( load_form(__DIR__.'/../../generate/footer', [
            'year' => Date('Y')
        ]));

}
