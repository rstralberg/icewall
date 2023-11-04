
// class Session {

//     static set key(v) {
//         sessionStorage.setItem('key', v);
//     }
//     static get key() {
//         return sessionStorage.getItem('key');
//     }

//     static set user(v) { 
//         Session.validate();
//         if( v === null ) sessionStorage.removeItem(Session.item('user'));
//         else {
//             let u = {
//                 username: v.username,
//                 fullname: v.fullname,
//                 email: v.email,
//                 picture: v.picture,
//                 isAdmin: v.username === 'admin',
//             };
//             sessionStorage.setItem(Session.item('user'), JSON.stringify(u)); 
//         }
//     }
//     static get user() { 
//         Session.validate();
//         let u = sessionStorage.getItem(Session.item('user'));
//         return  u ? JSON.parse(u) :null;
//     }

//     static set page(v) { 
//         Session.validate();
//         if( v === null ) sessionStorage.removeItem(Session.item('page'));
//         else {
//             let p = {
//                 id:v.id,
//                 title:v.title,
//                 parentId:v.parentId,
//                 isParent:v.isParent==='1',
//                 author:v.author,
//                 showTitle:v.showTitle==='1',
//                 pos:v.pos,
//                 public:v.public==='1',
//                 style:v.style
//             };
//             sessionStorage.setItem(Session.item('page'), JSON.stringify(p));
//         }
//     }

//     static get page() {
//         Session.validate();
//         let p = sessionStorage.getItem(Session.item('page'));
//         if( p ) return JSON.parse(p);
//         else return {
//             id:0,
//             title:'',
//             parentId:0,
//             isParent:false,
//             author:'',
//             showTitle:false,
//             pos:0,
//             public:false,
//             style:''
//         }
//     }

//     static set site(v) {
//         Session.validate();
//         if( v === null ) sessionStorage.removeItem(Session.item('site'));
//         else {
//             let p = {
//                 key:v.key,
//                 name:v.name
//             };
//             sessionStorage.setItem(Session.item('site'), JSON.stringify(p));
//         }
//     }

//     static get site() {
//         Session.validate();
//         let p = sessionStorage.getItem(Session.item('site'));
//         if( p ) return JSON.parse(p);
//         else return null;
//     }
    
//     static set selected(v) {
//         Session.validate();
//         sessionStorage.setItem(Session.item('selected'),v);
//     }

//     static get selected() {
//         Session.validate();
//         let id = sessionStorage.getItem(Session.item('selected'));
//         return  id && id.length > 0 ? document.getElementById(id) : null;
//     }

//     static set selectedChild(v) {
//         Session.validate();
//         sessionStorage.setItem(Session.item('selectedChild'),v);
//     }

//     static get selectedChild() {
//         Session.validate();
//         let id = sessionStorage.getItem(Session.item('selectedChild'));
//         return  id && id.length > 0 ? document.getElementById(id) : null;
//     }

//     static validate() {
//         if( !isValid(Session.key) ) { alert('No session key. Did you forget to call Session.key at start?');  }
//     }

//     static item(v) {
//         return Session.key + '-' + v;
//     }

// }
