
function on_move_article(dir) {
    
    function move_up(article) {

        if (article.previousElementSibling) {
            article.parentNode.insertBefore(article, article.previousElementSibling);
        }
    
    }
    
    function move_down(article) {
    
        if (article.nextElementSibling) {
            article.parentNode.insertBefore(article.nextElementSibling, article);
        }
    
    }

    if( !is_valid(cur_article) ) {
        return;
    }
    
    if( dir === 'up')  {
        move_up(cur_article);
    }
    else {
        move_down(cur_article);
    }
}
