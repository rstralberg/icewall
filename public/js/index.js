
function index(host, pageId, showTitle) {

    Cookie.host = host;
    Cookie.pageId = pageId;

    getNavbar(Cookie.username);
    getPageTitle(pageId,Cookie.username);
    getBlocks(pageId);
    getFooter();
}

function onNavClick(e) {
    e.preventDefault();
    alert('nav');
}