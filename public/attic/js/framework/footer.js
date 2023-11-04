function getFooter() {
    let request = new Request('footer');
    request.send().then(
        (resolve) => {
            let element = document.querySelector('.footer');
            element.innerHTML = resolve.content; 
        },
        (reject) => { alert(reject); });
}
