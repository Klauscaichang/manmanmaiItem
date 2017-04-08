$(function(){
    var id , flag=false , data ;
    id = GetQueryString('couponid');

    getCoupon();
    

    function getCoupon(){
        loadProduct();
    }

    function loadProduct(){
        $.ajax({
            type: "get",
            data: {"couponid":id},
            dataType:"jsonp",
            url: "http://139.199.157.195:9090/api/getcouponproduct",
            success: function(response){
                // var html = template('cou-list-template',response);
                // $("#cou-list-box").html(html);
                data = response;     
                rand();
                
            }
        })
    }

    
    function rand(){
        var leng = 8;
        if(flag||data.result.length==0){
            return;
        }
        var newData = {"result":[]};
        if(leng >= data.result.length){
            leng = data.result.length;
        }
        for(var i = 0 ; i < leng ; i++){
            newData.result.push( data.result.shift() );
        }
        console.log(newData);
        var html = template('cou-list-template',newData);
        $("#cou-list-box").append(html);
        flag = false;
    }

    $(window).scroll(function(){
        var Height = $('body').height() - $(this).height() - $('#cou-list-box li:first-child').height() - $('.footer').height() ;
        var scrollTop = $('body').scrollTop();
        console.log(Height);
        console.log(scrollTop);
        if( scrollTop >  Height){
            rand();
            flag = true;
            console.log('加载了')
        }
    })


    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    var img_list = $('#img-list');
    var img_box = $('#img-box');
    var next = $("#next");
    var last = $("#last");

    var Hwidth = img_list.width();
    var list   = img_list.find('li')
    var width = list.width();
    
    var  i = 0 , timerid , timeoutid;

    timerid = setInterval(function(){
        i++;
        addTransition();
        setTransform(-i*width);
    },1000)     
    
/*
    next.on('click',function(){
        clearInterval(timerid);
        clearTimeout(timeoutid);
        i++;
        addTransition();
        setTransform(-i*width);
        setTimer();
    })
    last.on('click',function(){
        clearInterval(timerid);
        clearTimeout(timeoutid);
        i--;
        addTransition();
        setTransform(-i*width);
        setTimer();
    })

    function setTimer(){
        timeoutid = setTimeout(function(){
            timerid = setInterval(function(){
                next.click();
            },1000)    
        },1000)
    }
*/


    transitionEnd( img_list[0] , function(){
        console.log(img_list[0]);
        console.log(i);
        if( i >= list.length-1 ){
            i = 0;
            removeTransition();
            setTransform(-i*width);
        }else if( i <= 0 ){
            i =  list.length-1  ;
            removeTransition();
            setTransform(-i*width);
        }
    })

    function  addTransition(){
         img_list.css({transition:'all .2s'});
    }
    function removeTransition(){
         img_list.css({transition:'none'});
    }
    function setTransform(x){
          img_list.css({transform:"translateX("+x+"px)"}); 

    }


    function transitionEnd(dom,callback){
        /* 需要绑定事件的dom  绑定之后  当触发了 事件的时候  执行 callback */
        if(dom && typeof  dom == 'object'){
            dom.addEventListener('webkitTransitionEnd',function(){
                /*if(callback){
                    callback();
                }*/
                callback && callback();
            });
            dom.addEventListener('transitionend',function(){
                callback && callback();
            });
        }
    }


})