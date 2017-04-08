$(function(){
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getindexmenu",
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                var html = template("nav-template",data);
                $('#nav_box').html(html);
                var gengduo = $('#nav_box > ul > li:nth-child(8) ');
                gengduo.nextAll().hide();
                gengduo.click(function(){
                    gengduo.nextAll().toggle();
                })
            }
        });

        function getNumber(str){
            return str.replace(/[^0-9]+/g , "");
        }
  
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            dataType: "jsonp",
            success: function (data) {
                 template.helper('getNumber',getNumber);
            
                var html = template('list_template',data);
       
                $('#list_box').html(html);
            }
        });
    

})