
/*  ==============================
    Events from Right sidebar
    ============================== */

    function evToggleTitle() {
        toggleTitle();
    }

    function evAddContent() {
        addContent(document.querySelector('.content').childElementCount);
    }

    function evTogglePagePublic(e) {
        e.innerText = e.innerText === 'Publik' ? 'Intern' : 'Publik';
        updatePagePublic(e.innerText==='Publik');
    }

    function evEditPages() {
        onEditPages();
    }

    function evEditUsers() {
        onEditUsers();
    }

    function evEditSettings() {
        onEditSettings();
    }

    function evEditColors() {
        onEditColors();
    }

    function evEditBorders() {
        onEditBorders();
    }

    function evEditFonts() {
        onEditFonts();
    }

    function evEditSizes() {
        onEditSizes();
    }

    function evEditShadows() {
        onEditShadows();
    }

    function evSaveTheme() {
        onSaveTheme();
    }

    function evSaveThemeAs() {
        onSaveThemeAs();
    }

    function evDeleteTheme() {
        onDeleteTheme(); 
    }
