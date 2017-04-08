$(function(){

    oneGet();
    
    function oneGet(){
        getinlanddiscount();
    }

    var product_list = $("#product_list");
    //获取加载的数据
    var data ;

    function getinlanddiscount(){
        $.ajax({
            type: 'get',
            url: "http://139.199.157.195:9090/api/getinlanddiscount",
            dataType: "jsonp",
            success: function(response){
                data = response;
                rand();
            }
        })
    }
    
    // 因为页面渲染需要时间，只有渲染完成之后才能再次调用
    var flag = false;

    // 渲染数据
    function rand(){
        // 用一个新的对象来存储每次需要加载的数据
        var newData = {result:[]};
        var leng = 8;
        // 如果所拥有的数据少于8组，那么加载剩下的
        if(leng >= data.result.length){
            leng = data.result.length;
        }
        // 每次在新的对象里面存储这么多数据，并且然原来的那个删除，从前面开始删，另一个往里面添
        for(var i = 0 ;i < leng ; i++){
            newData.result.push( data.result.shift() )
        }
        var html = template('pro-list-template',newData);

        product_list.append(html);

        flag = false;

    }


    $(window).scroll(function(){
        //如果没有数据那么就不加载了 
        if(data.result.length == 0 || flag){
            return;
        }
        
        // 判断是否触底
        // 头部可以卷去的高度 =  页面高度 - 屏幕高度 - 可以卷的高度  
        var top = $('body').innerHeight() - $(this).height() -  product_list.find(':first-child').height() ;
        console.log(top);
        // 获取当前页面被卷去的高度，然后和可以卷去的高度做对比
        var currentTop = $('body').scrollTop();
        console.log(currentTop);
        
        if( currentTop > top ){

            flag = true;
            rand();

            console.log("加载了");
        }
    })


})