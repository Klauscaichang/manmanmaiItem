$(function(){

    var Rname = /^[a-zA-Z\d]\w{1,11}[a-zA-Z\d]$/;
    var Rpassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    var Rphone = /^1[3|4|5|7|8][0-9]{9}$/;
    var Remail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

    var userName = $('#userName');
    var userPassword = $("#userPassword");
    var userPhone = $("#userPhone");
    var userEmail = $("#userEmail");
    //验证码输入框
    var userReceive = $('#userReceive')[0];
    //手机验证码输入框
    var userPhoneR = $('#userPhoneR')[0];
    // 点击获取验证码
    var getReceive = $('#btn_getReceive')[0];

    // 正则验证
    var Rarr = [Rname,Rpassword,Rphone];
    // 需要验证的元素
    var userArr = [userName,userPassword,userPhone];
    for(var i = 0 ;i<userArr.length;i++){
        userArr[i][0].index = i ; 
        userArr[i][0].isAccord = false;
        userArr[i].blur(function(){
                        var value = this.value;
                        // 因为用户可能需要更改，那么每次更改之前让他不成立，后面判断完成之后再成立
                        this.isAccord=false;
                        $(this).siblings().remove();
                        if(!value){
                            $(this).parent().append("<p>"+this.alt+"不能为空</p>");
                        }else if(Rarr[this.index].test(value)){
                            // 如果符合条件那么就让这个表单为ture；
                             this.isAccord = true;
                            if(this.alt == '密码'){
                                  $(this).parent().append("<p>恭喜密码可以使用</p>");   
                            }else{
                                 $(this).parent().append("<p>恭喜&nbsp;<i>"+value+"</i>&nbsp;可以使用</p>");   
                            }                        
                        }else{
                            $(this).parent().append("<p>"+this.alt+"&nbsp;<i>"+value+"</i>&nbsp;不符合要求</p>");
                        }
                })
    }   
    getReceive.onclick=function(){
        // 用来判断前面表单验证是否正确
        var isContinue = true;
        // 记录那个不正确的表单
        var current = null;
        // 遍历前面表单
        userArr.forEach(function(v){
            // 如果自定义一个属性记录了他们表单是否正确
            if(!v.get(0).isAccord){
                // 如果不正确那么就获取这个表单
                current = v.get(0);
                // 然后不能继续
                isContinue = false;
            }
        })
        // 如果前面表单都正确
        if(isContinue){
            // 图片的验证码。没有数据就自定义了
            var imgR = 8234;
            // 然后在判断图片的验证码是否正确
            if(userReceive.value == imgR){
                // 如果向这个手机号发送验证码，
                // 随机的手机验证码
                var Receive = parseInt( Math.random() * 1000000 );
                //  发送验证码
                console.log(userPhone.val()+'==='+Receive);
            }else{
                $(userPhoneR).prepend("<p>图片验证码不正确</p>")
            }      
         
        // 如果不正确那么就提示哪个表单不正确
        }else{
            alert(current.alt+"不正确，请重新输入");
        }
    }

    userEmail.blur(function(){
            var value = this.value;
             $(this).siblings().remove();
            if(!value){
                $(this).parent().append("<p>"+this.alt+"不能为空</p>");
            }else if(Remail.test(value)){
                 $(this).parent().append("<p>恭喜&nbsp;<i>"+value+"</i>&nbsp;可以使用</p>");                         
            }else{
                $(this).parent().append("<p>"+this.alt+"&nbsp;<i>"+value+"</i>&nbsp;不符合要求</p>");
            }
    })
})