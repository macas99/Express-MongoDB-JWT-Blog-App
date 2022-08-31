$('.heart').on('click', function () {
    if ($(this).hasClass('off')) {
        $(this).removeClass('off');
        $(this).css("color", "red");
        $(this).addClass('on');
        addLike($(this).parent().prev().find('.likes'));
    } else {
        $(this).removeClass('on');
        $(this).css("color", "black");
        $(this).addClass('off');
        removeLike($(this).parent().prev().find('.likes'));
    }
});

function addLike(element) {
    const likes = $(element).text().trim();
    $(element).text(parseInt(likes) + 1); 
}

function removeLike(element) {
    const likes = $(element).text().trim();
    $(element).text(parseInt(likes) - 1); 
}