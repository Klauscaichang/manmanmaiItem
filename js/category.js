$(function(){

    var accordion = $('#accordion');

    $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getcategorytitle",
        dataType: "jsonp",
        success: function (data) {
            var html = template('title-template',data);
            accordion.html(html);
            
            var list = accordion.find("div>.panel-heading>.panel-title>a");
         
            for(var i = 0;i<list.length;i++){

                // 默认每一个下拉菜单都是没有内容的
                list[i].isHave = false;
                list[i].index = i;
                list[i].onclick=function(){

                    // 先排他，留自己，但是没有动画，会有跳动
                    // closeAll(list[this.index]);

                    //如果有这个类名，那么说明之前点击过一次
                    if(  $(this).hasClass('collapsed') ){
                        // 所以就让他有true，这也保证不会再次发生请求
                        this.isHave = true;
                        // 然后再将移除
                        $(this).removeClass('collapsed');
                        // 最后将下拉栏的内容隐藏
                        $(this).parent().parent().siblings().hide();
                    }else{
                        // 只有在没有拥有的时候才加载
                        // console.log(this.isHave);
                       if( !this.isHave ){              
                             getInfo( $(this).parent().parent().parent() , this.getAttribute('titleid') );
                            //  如果有了，那么就让加载好的隐藏
                        }else{   
                             $(this).parent().parent().siblings().show();
                        }
                        $(this).addClass('collapsed');
                    }

                // 清除所有，留下自己 
                    function closeAll(current){
                        for(var i = 0 ; i < list.length ; i++){
                            if( list[i]==current ){
                                continue;
                            }
                            $(list[i]).removeClass('collapsed');
                            $(list[i]).parent().parent().siblings().hide();
                        }
                    }
                }
            }
        
        }   
    });
    
    function getInfo(ele,id){
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getcategory",
            data: {"titleid":id},
            dataType: "jsonp",
            success: function (data) {
                var html = template('list-template',data);
                ele.append(html);
                

            }
        });   
    }

})