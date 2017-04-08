$(function(){
    $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getcoupon",
        dataType: "jsonp",
        success: function (response) {
            var html = template("coupon-template",response);
            $("#coupon_box").html(html);
        }
    });
})