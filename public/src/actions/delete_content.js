function content_delete() {

    let select = get_session_selection();
    if (select) {
        server('unregister_content', {
            contentid: parseInt(select.id.substring(1))
        }).then(
            () => {
                update_content();
            },
            (reject) => { alert(reject);}
        );
    }
}

