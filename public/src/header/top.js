
//  ------------------------
//  args:
//      pageid
//  ------------------------

function top_menu() {
    
    server('header/top', {
        pageid: get_session_page().id,
        theme: cut_char_from_ends(get_style('theme'))
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
  