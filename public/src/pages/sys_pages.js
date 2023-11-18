function sys_pages() {

    server('sys/sys_pages_form', {}).then(
        (resolve) => {
            add_form('edit-pages-form', resolve);
        }
    )
}

function sys_pages_form_page_selected() {

    let pageid = document.getElementById('sys-pages-form-pages').value;
    let pagelist = document.getElementById('sys-pages-form-pagelist');
    document.getElementById('sys-pages-form-selected').value = 'p'+pageid;
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
                    document.getElementById('sys-pages-form-selected-name').value = page.title;
                    li.classList.add('selected-listitem');
                }
                pagelist.appendChild(li);
            });
            enable_element('sys-pages-form-delete', true);
            enable_element('sys-pages-form-rename', true);
        },
        (reject) => {
            error(reject);
        }
    );
}

function sys_pages_form_new_name() {
    enable_element('sys-pages-form-rename-button', document.getElementById('sys-pages-form-rename').value.length > 0);
}

function sys_pages_form_rename() {
    server('pages/rename_page', {
        pageid: document.getElementById('sys-pages-form-selected').value.substring(1),
        title: document.getElementById('sys-pages-form-rename').value
    }).then( 
        () => {
            get_top_menu();
        },
        (reject) => { error(reject); }
    );

}

function sys_pages_form_parent_selected() {
    let parent = document.getElementByIduery_value('sys-pages-form-parent-select').value;
    let id = document.getElementById('sys-pages-form-selected').value.substring(1);

    server('update_page', {
        pageid: parseInt(id) ,
       cols: ['parentId'],
        values: [parseInt(parent)] }).then(
        () => {
            get_top_menu();
        },
        (reject) => { error(reject); }
    );

}

function sys_pages_form_move_up() {

    let selected_pageid = document.getElementById('sys-pages-form-selected').value;
    let ul = document.getElementById('sys-pages-form-pagelist');
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
        get_top_menu();

    }
}

function sys_pages_form_move_down() {

    let selected_pageid = document.getElementById('sys-pages-form-selected').value;
    let ul = document.getElementById('sys-pages-form-pagelist');
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
        get_top_menu();
            
    }
}

function sys_pages_form_delete() {
    let selected_page = document.getElementById('sys-pages-form-selected').value;
    if( is_valid(selected_page) ) {
        let pageid = selected_page.substring(1);
        yesno('Radera sida', 'Är du säker på att du vill radera sidan "'+ document.getElementById('sys-pages-form-selected-name').value + '"', 'sys_pages_form_delete_page', 'sys_pages_form_skip_delete_page');
    }
}

function sys_pages_form_delete_page() {
    remove_form('yesno');
    server('pages/delete', {
        pageid: document.getElementById('sys-pages-form-selected').value.substring(1)
    }).then(
        () => {
            get_top_menu();
        },
        (reject) => { 
            popup('Radeing av sida', reject);
        }
    );    
}

function sys_pages_form_skip_delete_page() {
    remove_form('yesno');
}

function sys_pages_form_close() {
    remove_form('edit-pages-form');
}


