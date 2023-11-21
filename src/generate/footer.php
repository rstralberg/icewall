<?php

require_once __DIR__ . '/../db/db_select.php';
require_once __DIR__ . '/../utils/send_reply.php';
require_once __DIR__ . '/../utils/load_form.php';

// function generate_footer(stdClass $args) : void {

//     $db = db_open($args->database);
//     $sites = db_select($db, 'sites', ['owner'], db_where($db, 'id',1));
    
//     if(!$sites) {
//         send_reject(db_error($db));
//     }
    
//      $site = $sites[0];
//      send_resolve(load_form(__DIR__.'/footer', [
//             'owner' => $site['owner'],
//             'year' => Date('Y')
//      ]));
// }
?>