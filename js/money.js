$(function () {

    moneyProduct(1, "#list_box");


    function moneyProduct(pageid, domid) {
        pageid = pageid || 1;
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            dataType: "jsonp",
            data: {
                "pageid": pageid
            },
            success: function (response) {
                template.helper('getNumber', getNumber);
                var html = template('list_template', response);
                $(domid).html(html);
                var page = Math.ceil(response.totalCount / response.pagesize);
                var selectHtml = '';
                for (var i = 1; i < page + 1; i++) {
                    selectHtml += "<option value=" + i + ">" + i + "/" + page + "</option>";
                }
                var select_box = $("#select-box");
                select_box.html(selectHtml);
                select_box.change(function () {
                    var value = this.value;
                    selectPage(value);
                })
                $("#s-last,#s-next").click(function () {
                    btnSelect.call(this);
                })
                

                function selectPage(pageid) {
                    $.ajax({
                        type: 'get',
                        url: 'http://139.199.157.195:9090/api/getmoneyctrl',
                        data: {
                            "pageid": pageid
                        },
                        dataType: 'jsonp',
                        success: function (response) {
                            var html = template('list_template', response);
                            $(domid).html(html);
                        }
                    })
                }

                function btnSelect() {
                    var value = select_box.val();
                    var btnvalue = this.value;
                    btnvalue === '上一页' ? value-- : value++;
                    if (value <= 1) {
                        value = 1;
                    } else if (value >= page) {
                        value = page;
                    }
                    select_box.val(value);
                    selectPage(value);
                }
            }
        });
    }


    function getNumber(str) {
        return str.replace(/[^0-9]+/g, "");
    }

})