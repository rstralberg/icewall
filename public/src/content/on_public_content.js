
function on_public_content() {
    
    let section = get_session_selection();
    if( !is_valid(section) ) return;

    let public = section.getAttribute('ispublic')  === 'true';

    server('content/content_public', {
        id: section.id.substr(1),
        public: !public
    }).then(
        (resolve) => {
            let section = get_session_selection();
            if( resolve ) {
                section.setAttribute('ispublic', 'true');
                replace_class(section, 'draft', 'public');
                org_class =  'public';
            }
            else {
                section.setAttribute('ispublic', 'false');
                replace_class(section, 'public', 'draft');
                org_class =  'draft';
            }
        }
    );

}