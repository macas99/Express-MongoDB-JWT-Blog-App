$(document).on('keyup', '#live-search', function () {
    var input = $(this).val();
    if (input != "") {
        $.ajax({
            url: "/search",
            method: 'POST',
            data: {
                input: input
            },

            success: function (data) {
                if (data === "error") return $("#search-result").html("error");
                const json = JSON.parse(data);
                $("#search-result").html(getHTML(json.users, json.posts));
            }
        });
    }
});

function getHTML(users, posts) {
    let html = "";
    if (users.length > 0) {
        html += "<h5>Users</h5>";
        users.forEach((user) => {
            const div = "<div class='container mb-2 post-prev'>";
            const a = "<a class='link-content' href='/user/" + user.name + "'>";
            const end = user.name + "</a></div>";
            html += div + a + end;
        });
    }
    if (posts.length > 0) {
        html += "<h5>Posts</h5>";
        posts.forEach((post) => {
            const div = "<div class='container mb-2 post-prev'>";
            const a = "<a class='link-content' href='/posts/" + post._id + "'>"
            const end = post.title + "</a></div>";
            html += div + a + end;
        });
    }
    return html === "" ? "No result" : html;
}