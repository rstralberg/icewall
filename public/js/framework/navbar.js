
function navbarToggle(navbar) {
    var element = document.querySelector('.'+navbar);
    if (element.className === navbar) {
        element.className += ' responsive';
    } else {
        element.className = navbar;
    }
}


function navbarPageSelected(id) {
    getPage(id).then( 
        (page) => {
            Session.page = page;
            getPageTheme(id);
            //getTools('right');
            getPageTitle(id, Session.user.username);
            getContents(id);
        },
        (error) => {
            popup('FEL', error);
        } 
    );

}

function navbarThemeSelected(theme) {

    loadTheme(theme);

}

function onThemeSelect() {

    let select = document.getElementById('theme-select');
    let themeName = select.options[select.selectedIndex].value;
    loadTheme(themeName);

}

function navbarParentClicked(e) {

	let ul = e.querySelectorAll('ul')[0];
	if (ul) {

		toggleDisplay(ul);
		for (let i = 0; i < ul.childElementCount; i++) {
			let li = ul.children[i];
			toggleDisplay(li);
		}
	}
}

function navbarToggleIconClicked(e) {
	let menu = document.querySelector('#menu');
	toggleDisplay(menu);

	let burger = document.querySelector('#nav-burger');
	let close =  document.querySelector('#nav-close');

	burger.style.display = burger.style.display === 'none' ? 'content' : 'none';
	close.style.display = burger.style.display === 'none' ? 'content' : 'none';
	
}


function getNavbar(username) {
    let request = new Request('getNavbar', {
        username: username,
        theme: get_style('name')
    });
    request.send().then(
        (resolve) => { 
            let element = document.querySelector('.navbar');
            element.innerHTML = resolve.content; 
        },
        (reject) => { alert(reject); });

}


