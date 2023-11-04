function getSub(pageId) {
    let request = new SrvReq('getSub', [
        { key: 'pageId', value: pageId },
        { key: 'username', value: Session.user.username }
    ]);
    request.send().then((resolve) => {
        let element = eGet('.sub');
        element.innerHTML = resolve;
        let left = eGet('.left');
        let right = eGet('.right');
        if (left === null)
            return;
        if (right === null)
            return;
        if (!canEdit('content'))
            left.style.display = 'none';
        if (!canEdit('page'))
            right.style.display = 'none';
    }, (reject) => { alert(reject); });
}
