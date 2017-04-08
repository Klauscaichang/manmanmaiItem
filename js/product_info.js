$(function(){
    
 var id = GetQueryString("productid");

    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproduct',
        data:{"productid":id},
        dataType:'jsonp',
        success:function(response){
                var categoryid = response.result[0].categoryId;
                $.ajax({
                        type: "get",
                        url: "http://139.199.157.195:9090/api/getcategorybyid",
                        data: {"categoryid":categoryid},
                        dataType: "jsonp",
                        success: function (response) {
                                var html = "<a href=prolist.html?id="+response.result[0].categoryId +"> &nbsp;"+response.result[0].category+" > </a>";
                                $('#product-title').html(html);
                        }   
                })
                var name = response.result[0].productName.split(' ');
                var html = "<a href='#' > &nbsp;"+name[0]+" >   </a>"          
                $('#product-info').html(html);
                $.ajax({
                    type:'get',
                    url:'http://139.199.157.195:9090/api/getproductcom',
                    data:{'productid':id},
                    dataType:'jsonp',
                    success:function(response){
                        var html = template("product-com-template",response);
                        $('#com-point-box').html(html);
                    }
                })
        }
    })

    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    
    $("#btn-close-app").click(function(){
        $(this).parent().parent().hide();

    })

})