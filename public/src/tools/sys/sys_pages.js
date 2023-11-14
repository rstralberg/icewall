function sys_pages() {

    server('sys/sys_pages', {}).then(
        (resolve) => {
            add_form('edit-pages-form', resolve);
        }
    )
}

function ep_page_selected() {

    let pageid = query_value('ep-pages');
    let pagelist = query_id('ep-pagelist');
    query_id('ep-selected').value = 'p'+pageid;
    pagelist.innerHTML = '';

    server('pages/get_pages', {
        where: '`parentId`=0'
    }).then(
        (resolve) => {
            let pages = JSON.parse(resolve);
            pages.forEach(page => {
                let li = document.createElement('li');
                li.value = page.id;
                li.id = 'p'+page.id;
                li.innerText = page.title;
                if( page.id  === pageid ) {
                    query_id('ep-selected-name').value = page.title;
                    li.classList.add('selected-listitem');
                }
                pagelist.appendChild(li);
            });
            enable_element('ep-delete', true);
            enable_element('ep-rename', true);
        },
        (reject) => {
            error(reject);
        }
    );
}

function ep_new_name() {
    enable_element('ep-rename-button', query_value('ep-rename').length > 0);
}

function ep_rename() {
    server('pages/rename_page', {
        pageid: query_value('ep-selected').substring(1),
        title: query_value('ep-rename')
    }).then( 
        () => {
            update_navbar();
        },
        (reject) => { error(reject); }
    );

}

function ep_parent_selected() {
    let parent = query_value('ep-parent-select');
    let id = query_value('ep-selected').substring(1);

    server('update_page', {
        pageid: parseInt(id) ,
       cols: ['parentId'],
        values: [parseInt(parent)] }).then(
        () => {
            update_navbar();
        },
        (reject) => { error(reject); }
    );

}

function ep_move_up() {

    let selected_pageid = query_value('ep-selected');
    let ul = query_id('ep-pagelist');
    if (ul === null)
        return;
    
    let moved = false;
    // find position
    let newList = new Array();
    let pos = 0;
    for (let i = 0; i < ul.childElementCount; i++) {
        newList.push(ul.children[i]);
        if (ul.children[i].id === selected_pageid) {
            pos = i;
        }
    }
    // swap
    if (pos > 0) {
        let temp = newList[pos - 1];
        newList[pos - 1] = newList[pos];
        newList[pos] = temp;
        moved = true;
    }
    // rebuild
    ul.innerHTML = '';
    for (let i = 0; i < newList.length; i++) {
        let li = document.createElement('li');
        li.id = newList[i].id;
        li.style.listStyle = 'none';
        if (newList[i].id === selected_pageid) {
            li.classList.add('selected-listitem');
        }
        li.innerText = newList[i].innerText;
        ul.appendChild(li);
    }
    if (moved) {
        let positions = new Array();
        for (pos = 0; pos < ul.childElementCount; pos++) {
            positions.push({
                id: parseInt(ul.children[pos].id.substring(1)),
                pos: pos
            });
        }
        update_page_positions(positions);
        update_navbar();

    }
}

function ep_move_down() {

    let selected_pageid = query_value('ep-selected');
    let ul = query_id('ep-pagelist');
    if (ul === null)
        return;
    
    let moved = false;
    // find position
    let newList = new Array();
    let pos = 0;
    for (let i = 0; i < ul.childElementCount; i++) {
        newList.push(ul.children[i]);
        if (ul.children[i].id === selected_pageid) {
            pos = i;
        }
    }
    // swap
    if (pos < ul.childElementCount - 1) {
        let temp = newList[pos + 1];
        newList[pos + 1] = newList[pos];
        newList[pos] = temp;
        moved = true;
    }
    // rebuild
    ul.innerHTML = '';
    for (let i = 0; i < newList.length; i++) {
        let li = document.createElement('li');
        li.id = newList[i].id;
        li.style.listStyle = 'none';
        if (newList[i].id === selected_pageid) {
            li.classList.add('selected-listitem');
        }
        li.innerText = newList[i].innerText;
        ul.appendChild(li);
    }
    if (moved) {
        let positions = new Array();
        for (pos = 0; pos < ul.childElementCount; pos++) {
            positions.push({
                id: parseInt(ul.children[pos].id.substring(1)),
                pos: pos
            });
        }
        update_page_positions(positions);
        update_navbar();
            
    }
}

function ep_delete() {
    let selected_page = query_value('ep-selected');
    if( is_valid(selected_page) ) {
        let pageid = selected_page.substring(1);
        yesno('Radera sida', 'Är du säker på att du vill radera sidan "'+ query_value('ep-selected-name') + '"', 'ep_delete_page', 'ep_skip_delete_page');
    }
}

function ep_delete_page() {
    remove_form('yesno');
    server('pages/delete', {
        pageid: query_value('ep-selected').substring(1)
    }).then(
        () => {
            update_navbar();
        },
        (reject) => { 
            popup('Radeing av sida', reject);
        }
    );    
}

function ep_skip_delete_page() {
    remove_form('yesno');
}

function ep_close() {
    remove_form('edit-pages-form');
}


