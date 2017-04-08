$(function(){
    $.ajax({
        url:"http://139.199.157.195:9090/api/getsitenav",
        type:'get',
        dataType:'json',
        success:function(data){
            var html = template('siteModel',data);
            $('.s-n-box').html(html);
        }
    })
})