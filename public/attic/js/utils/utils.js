

// function updateHtml(id, html) {
//     let element = document.querySelector(id);
//     element.innerHTML = html;
// }

// function random_int() {
//     return Math.floor(Math.random() * 30000);
// }

// function selectOption(selectElement, value) {
//     for (let index = 0; index < selectElement.childElementCount; index++) {
//         if (selectElement.children[index].value === value) {
//             selectElement.selectedIndex = index;
//             return;
//         }
//     }
// }

// function toggleDisplay(element, expr = 'block') {
//     if (element.style.display === 'none' || element.style.display === '')
//         element.style.display = expr;
//     else
//         element.style.display = 'none';
// }

// function toggleClass(element, cls) {
//     if (element.classList.contains(cls))
//         element.classList.remove(cls);
//     else
//         element.classList.add(cls);
// }

// function toggleClasses(element, c1, c2) {
//     if (element.classList.contains(c1)) {
//         element.classList.remove(c1);
//         element.classList.add(c2);
//     }
//     else if (element.classList.contains(c2)) {
//         element.classList.remove(c2);
//         element.classList.add(c1);
//     }
// }

// function canEdit( what ) {
//     let user = Session.user;
//     let page = Session.page;

//     if (isValid(user)) {

//         switch (what) {
//             case 'page': return user.isAdmin;
//             case 'content': return user.isAdmin|| ( page ? user.username === page.author : false);
//             case 'user': return user.isAdmin;
//             case 'theme': return user.isAdmin;
//             case 'settings': return user.isAdmin;
//         }
//     }
//     return false;

// }

// function isValid(v) {
//     if( v===null) return false;
//     if( typeof v === 'undefined' ) return false;
//     if( typeof v === 'number' && isNaN(v) ) return false;
//     return true;
// }

// function sqlString(s) {
//     return '\'' + s + '\'';
// }

// function filenameOnly(path) {
//     let fileNameIndex = path.lastIndexOf("/") + 1;
//     return  path.substr(fileNameIndex);
// }

// function enable(elementId) {
//     getElement(elementId).removeAttribute('disabled');
// }

// function disable(elementId) {
//     getElement(elementId).setAttribute('disabled','');
// }

// function getElemValue(elementId) {
//     return getElement(elementId).value;
// }
// function setElemValue(elementId, value) {
//     getElement(elementId).value = value;
// }

// function getElement(elementId) {
//     return document.getElementById(elementId);
// }

// function isEmpty( str ) {
//     if( !isValid(str)) return true;
//     return str.length === 0;
// }

// function addImagePath(imgfile) {
//     return 'sites/' + Session.site.key + '/images/' + imgfile;
// }

// function stripImagePath(imgurl) {
//     return filenameOnly(imgurl);
// }