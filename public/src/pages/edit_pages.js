function edit_pages() {

    server('pages/edit_pages_form', {}).then(
        (resolve) => {
            add_form('edit-pages-form', resolve);
        }
    )
}

function edit_page_selected(element) {

    let pageid = element.value;

    let pagelist = document.getElementById('edit-pages-pagelist');
    document.getElementById('edit-pages-selected').value = 'p'+pageid;
    pagelist.innerHTML = '';

    server('pages/get_top_pages', {}).then(
        (resolve) => {
            let pages = JSON.parse(resolve);
            pages.forEach(page => {
                let li = document.createElement('li');
                li.value = page.id;
                li.id = 'p'+page.id;
                li.innerText = page.title;
                if( page.id  === pageid ) {
                    document.getElementById('edit-pages-selected-name').value = page.title;
                    li.classList.add('selected-listitem');
                }
                pagelist.appendChild(li);
            });
            enable_element('edit-pages-delete', true);
            enable_element('edit-pages-rename', true);
        },
        (reject) => {
            error(reject);
        }
    );
}

function edit_new_pagename(element) {
    enable_element('edit-pages-rename-button', element.value.length > 0);
}

function edit_change_pagename() {
    server('pages/rename_page', {
        pageid: document.getElementById('edit-pages-selected').value.substring(1),
        title: document.getElementById('edit-pages-rename').value
    }).then( 
        () => {
            get_top_menu();
        },
        (reject) => { error(reject); }
    );

}

function edit_parent_selected(element) {
    let parent = element.value;
    let id = document.getElementById('edit-pages-selected').value.substring(1);

    server('pages/update_page', {
        pageid: parseInt(id) ,
        cols: ['parentId'],
        values: [parseInt(parent)] }).then(
        () => {
            get_top_menu();
        },
        (reject) => { error(reject); }
    );

}

function page_move_up() {

    let selected_pageid = document.getElementById('edit-pages-selected').value;
    let ul = document.getElementById('edit-pages-pagelist');
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

function page_move_down() {

    let selected_pageid = document.getElementById('edit-pages-selected').value;
    let ul = document.getElementById('edit-pages-pagelist');
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

function delete_selected_page() {
    let selected_page = document.getElementById('edit-pages-selected').value;
    if( is_valid(selected_page) ) {
        yesno( 'Radera sida', 
            'Är du säker på att du vill radera sidan "' + 
            document.getElementById('edit-pages-selected-name').value + '"', 
            'yes_delete_the_page', 'close_yesno');
    }
}

function yes_delete_the_page() {
    close_yesno();
    server('pages/delete_page', {
        pageid: document.getElementById('edit-pages-selected').value.substring(1)
    }).then(
        () => {
            get_top_menu();
            
            server('pages/get_top_pages', {}).then(
                (resolve) => {
                    let pages = JSON.parse(resolve);
                    let select = document.getElementById('edit-pages-pages');
                    select.innerHTML = '';
                    
                    let option = document.createElement('option');
                    option.value = 'none';
                    option.innerText = 'Välj!'
                    select.appendChild(option);
                    pages.forEach(page => {
                        let option = document.createElement('option');
                        option.value = page.id;
                        option.innerText = page.title;
                        select.appendChild(option);
                    });
                },
                (reject) => {
                    error(reject);
                }
            );
        },
        (reject) => { 
            popup('Radeing av sida', reject);
        }
    );    
}

function close_editpages() {
    remove_form('edit-pages-form');
}



