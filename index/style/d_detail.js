$(function () {
    $('.bt_span').hover(
        function () {
       $(this).children('img').attr('src','./images/more-ed@2x.png')
    },
        function () {
            $(this).children('img').attr('src','./images/mouse_not_more@2x.png')
        }
    );
});