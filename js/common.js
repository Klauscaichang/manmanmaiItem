$(function(){

    $('#closefix').click(function(){
        $(this).parent('div').hide();
    })
    
    // 底部盒子
    var footer = $('footer[class=footer]');
    // 页面
    var body = $('body')[0];
    //打开app盒子的高度
    var app_height = $('#app_open').height();
    //页面高度
    var pageH = $(body).height();
    //屏幕高度
    var innerH = window.innerHeight;

    //页面被卷的高度
    var scrollT = 0;
    //屏幕高度
    // console.log(window.innerHeight);
    body.addEventListener('touchmove',function(e){
        scrollT = window.scrollY;
        if( (pageH-innerH)<(scrollT+app_height) ){
            footer.addClass('p-bottom');
        }else{
            footer.removeClass('p-bottom');
        }
    })

})  