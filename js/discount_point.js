$(function(){
    
    var id = GetQueryString('productid'); 

    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getdiscountproduct',
        data: {"productid":id},
        dataType: "jsonp",
        success:function(response){
            var html = template("pro-point-template",response);
            $("#point_box").html(html);
            var name = response.result[0].productName;
     
            
            $('#product-title').html('<a href="#">'+name+'</a>')
        }
    })
      
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

})