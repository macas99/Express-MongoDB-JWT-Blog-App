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

function updateLikes(username, post) {
    const removeLike = $('#' + post).hasClass('on');
    $.post("/home", { name: username, post: post, removeLike: removeLike ? 1 : null })
        .done(function (data) {
            console.log(data);
        }).fail(function () {
            console.log("error");
        });
}

function updateFollow(user, profile) {
    const follow = $('.follow').hasClass('on');
    console.log("ON TAG:" + follow);
    $.post("/user", { name: user, profile: profile, follow: follow })
        .done(function (data) {
            console.log(data);
        }).fail(function () {
            console.log("error");
        });
}

$('.follow').on('click', function () {
    if ($(this).hasClass('off')) {
        $(this).removeClass('off btn-dark');
        $(this).addClass('on btn-success');
        $(this).text('Follow');

    } else {
        $(this).removeClass('on btn-success');
        $(this).addClass('off btn-dark');
        $(this).text('Unfollow');
    }
});