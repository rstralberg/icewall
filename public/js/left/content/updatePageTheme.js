function updatePageTheme(theme) {
    let request = new SrvReq('updPageTheme', [
        { key: 'pageId', value: Session.page.id },
        { key: 'theme', value: theme }
    ]);
    request.send().then((resolve) => {
        popup('Tema sparat!');
        closePageTheme();
    }, (reject) => {
        error(reject);
        closePageTheme();
    });
}
