
function page_selected(pageid) {

    console.log( 'pages/get('+pageid+')' );
    server('pages/get', {
        pageid: pageid
    }).then(
        (resolve) => {
            
            set_session_page(JSON.parse(resolve));
            set_tool_state('adt-public', get_session_page().isPublic ? 'active' : 'nomrmal');
            get_title();

            server('content/get', {
                pageid: pageid
            }).then( 
                (resolve) => {
                    draw_content(JSON.parse(resolve));
                },
                (reject) => { popup('Sidans innehåll', reject);}
            )
        },
        (reject) => { error(reject); }
    );
}

function on_page_parent_selected(e) {
    
    let ul = e.querySelectorAll('ul')[0];
    if (ul) {
        toggle_display(ul);
        for (let i = 0; i < ul.childElementCount; i++) {
            let li = ul.children[i];
            toggle_display(li);
        }
    }
}

function update_page( pageid, cols, values ) {

    server('pages/update', {
        pageid: pageid,
        cols: cols,
        values: values
    }).then(
        (resolve) => {
            set_session_page(JSON.parse(resolve));
        },
        (reject) => {
            error(reject);
        }
    )
}


function update_page_positions(pos_array)
{
    pos_array.forEach(item => {
        update_page( item.id, ['pos'], [item.pos] );
    });
}

function update_page_parent(id, parentid) {
    update_page(id, ['parentId'], [parentid]);
}




