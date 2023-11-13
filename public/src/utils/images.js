
function resize_img_by_wheel(e) {
    // e.preventDefault();
    if (is_valid(e)) {
        let w = e.target.clientWidth;
        w += e.deltaY > 0 ? 10 : -10;
        e.target.style.width = w + 'px';
    }
}

function picture_code(img_file, subfolder, width, caption = null) {

    if (subfolder === null) {
        subfolder = get_session_page().id + '/' + get_session_selection().id.substring(1);
    }
    let html = '<picture>';

    html += '<source ';
    html += 'media="(min-width:' + PC_MIN + 'px)" ';
    html += 'srcset= "sites/' + get_session_key() + '/' + subfolder + '/' + PC_SIZE + '/' + img_file + '">';

    html += '<source ';
    html += 'media="(min-width:' + PAD_MIN + 'px)" ';
    html += 'srcset= "sites/' + get_session_key() + '/' + subfolder + '/' + PAD_SIZE + '/' + img_file + '">';

    html += '<source ';
    html += 'media="(min-width:' + MOBILE_MIN + 'px)" ';
    html += 'srcset= "sites/' + get_session_key() + '/' + subfolder + '/' + MOBILE_SIZE + '/' + img_file + '">';

    html += '<source ';
    html += 'media="(min-width:' + THUMB_MIN + 'px)" ';
    html += 'srcset= "sites/' + get_session_key() + '/' + subfolder + '/' + THUMB_SIZE + '/' + img_file + '">';

    html += '<img ';
    html += 'class="shadow" ';
    html += 'style="width:' + width + 'px;height:auto;" ';
    html += 'alt="' + (caption ? caption : img_file) + '" ';
    html += 'src="sites/' + get_session_key() + '/' + subfolder + '/org/' + img_file + '" ';
    html += 'onwheel="resize_img_by_wheel()" >';

    html += '</picture>';
    return html;
}