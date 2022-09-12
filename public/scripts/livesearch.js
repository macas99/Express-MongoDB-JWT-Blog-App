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
                $("#search-result").html(data);
            }
        });
    }
});