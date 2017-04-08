$(function(){


    var id = GetQueryString("id");

   $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getcategorybyid",
        data: {"categoryid":id},
        dataType: "jsonp",
        success: function (response) {
                var html = "<a href='#' data-categoryId = "+response.result[0].categoryId+" data-titleId = "+response.result[0].titleId+" > "+response.result[0].category+" >   </a>" 
                $('#product-title').html(html);
        }
        
    })

     $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getproductlist",
        data: {"categoryid":id,"pageid":1},
        dataType: "jsonp",
        success: function (response) {
            var html = template("productInfo-template",response);  
            var product =   $("#product-list");    
            product.html(html);
            console.log(response);
            var page =  Math.ceil(response.totalCount / response.pagesize);        
            var selectHtml = '';
            for(var i = 1 ; i < page+1 ; i++){
                selectHtml +=  "<option value="+i+">"+i+"/"+page+"</option>";
            }
            var select_box =  $("#select-box");
            select_box.html(selectHtml);               
            select_box.change(function(){
                var value = this.value;
                selector(value);
            })
            $("#s-last,#s-next").click(function(){
                btnSelect.call(this);
            })
            function btnSelect(){
                var value = select_box.val();
                var btnvalue = this.value;
                btnvalue === '上一页' ? value-- : value++;            
                if(value <= 1){
                    value = 1;
                }else if(value >= page){
                    value = page;
                }
                select_box.val(value);
                selector(value);
            }

            function selector(page){ 
                $.ajax({
                    type:'get',
                    url:'http://139.199.157.195:9090/api/getproductlist',
                    data:{'categoryid':id,"pageid":page},
                    dataType:'jsonp',
                    success:function(response){
                        var html = template("productInfo-template",response);       
                        product.html(html);
                    }
                })
            }
        }
    })


    
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    

})