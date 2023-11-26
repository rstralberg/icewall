
//  ------------------------
//  args:
//      pageid
//  ------------------------

function get_top_menu() {
    
    server('header/get_top_menu', {
        pageid: get_session_page().id,
        theme: get_style('theme')
    }).then(
        (resolve) => {
            document.getElementById('top-menu').innerHTML = resolve;
        },
        (reject) => {
            popup('Meny',reject);
        }
    )
}

function top_menu_toggle() {
    var x = document.getElementById("top-menu");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  