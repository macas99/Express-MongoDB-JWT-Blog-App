//change heart color and like counter on heart-click
$('.heart').on('click', function () {
    if ($(this).hasClass('off')) {
        $(this).removeClass('off');
        $(this).css("color", "red");
        $(this).addClass('on');
        //increase like counter
        incrementNum($(this).parent().prev().find('.likes'));
    } else {
        $(this).removeClass('on');
        $(this).css("color", "black");
        $(this).addClass('off');
        //decrease like counter
        reduceNum($(this).parent().prev().find('.likes'));
    }
});

//change follow button and counter on follow/unfollow-click
$('.follow').on('click', function () {
    if ($(this).hasClass('off')) {
        $(this).removeClass('off btn-dark');
        $(this).addClass('on btn-success');
        $(this).text('Follow');
        //decrease follower count
        reduceNum($('.followers'));
    } else {
        $(this).removeClass('on btn-success');
        $(this).addClass('off btn-dark');
        $(this).text('Unfollow');
        //increase follower count
        incrementNum($('.followers'));
    }
});

function incrementNum(element) {
    const number = $(element).text().trim();
    $(element).text(parseInt(number) + 1);
}

function reduceNum(element) {
    const number = $(element).text().trim();
    $(element).text(parseInt(number) - 1);
}

//update DB on like
function updateLikes(username, post) {
    const removeLike = $('#' + post).hasClass('on');
    $.post("/posts/like", { name: username, post: post, removeLike: removeLike ? 1 : null })
        .done(function (data) {
            console.log(data);
        }).fail(function () {
            console.log("error");
        });
}

//update DB on follow
function updateFollow(user, profile) {
    const follow = $('.follow').hasClass('on');
    $.post("/user", { name: user, profile: profile, follow: follow ? 1 : null })
        .done(function (data) {
            console.log(data);
        }).fail(function () {
            console.log("error");
        });
}