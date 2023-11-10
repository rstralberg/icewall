
function resize_img_by_wheel(e) {
    e.preventDefault();
    let w = e.target.clientWidth;
    w += e.deltaY > 0 ? 10:-10;
    e.target.style.width = w + 'px';
    
}

