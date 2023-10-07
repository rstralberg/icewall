
function saveTheme(themeName, theme) {
    let request = new Request('saveTheme', {
        themeName: themeName,
        theme: theme
    });
    request.send().then(
        (resolve) => { },
        (reject) => { popup('FEL', reject); }
    );
}
