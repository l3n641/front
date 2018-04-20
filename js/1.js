function getType(type){
    var type;
    switch(type){
        case 1:
            return '交易量预警';
        case 2:
            return '价格预警';
        case 3:
            return '波幅预警';
        case 4:
            return '波幅预警';
        default:
            return '';
    }

}
var myPagenation=function(){

    var  length1=7;
    if (storeData.length > 0) {
        length1 = Math.ceil(storeData.length/pagesize)
    }
    $('#pagination-demo').twbsPagination({

        totalPages: length1,
        visiblePages: 5,


        onPageClick: function (event, page) {
           page=page;
            pagefunc(storeData,page,pagesize)
            console.log(page)
        }
    });
}
var pagefunc=function (data,page,pageSize) {

   if(!data||data.length===0){
       return;
   }
    var maxIndex=page*pageSize
    var minIndex=(page-1)*pageSize
console.log(maxIndex,minIndex)
    var html='';
    for(var i=minIndex;i<maxIndex;i++){
        if(!data[i]){
            $('.content1').html(html);
            return;
        }
        console.log(data[i])
        var type=getType(data[i].type);

        html +=`
               <tr>
               <td>${type}</td>
               <td>${data[i].exchange_name}</td>
              <td>${data[i].base}：${data[i].quote}</td>
              <td>${data[i].base_price}</td>
                <td>${data[i].interval}</td>
               <td>${data[i].amplitude}</td>
               <td>${data[i].quantity}</td>
              <td>${data[i].min_price}</td>
                <td>${data[i].max_price}</td>
                  <td><a href="javascript:void(0)" class="deleteData" data-ta=${data[i].id}>删除</a></td>
                  </tr>
               `;
    }
    $('.content1').html(html);

}
var storeData=[];
var pagesize=7;
var page=1;
var myAjax=function(){

    $.ajax({
        url: 'http://lhb.caiyunsecurity.com/index.php/api/symbol_rule/index',
        type: 'get',
        success: function (data) {
            storeData=data.data
            console.log(data)
           myPagenation();
           pagefunc(storeData,page,pagesize)
            $('.lastspan').ready(function(){
                console.log("eeeeeeeeeeeeeeeee")
                $('.lastspan').html("总共"+storeData.length+"预警");
            })

        }
    })

}

$(function () {
    ws = new WebSocket("ws://140.82.55.32:2345");
    ws.onopen = function() {
        alert("连接成功");
        ws.send('{"token":12345}');
        alert("给服务端发送一个字符串：tom");
    };
    ws.onmessage = function(e) {
        $(".dingling img").click(function () {
            $(".yujing").css("display","block");
            $(".xiaoxituisong").css("display","block");

            var divshow= $(".yujingspan");
            divshow.text("");// 清空数据
            divshow.append(e.data); // 添加Html内容，不能用Text 或 Val
        });
       console.log(e.data)

    };
    // 导航区域
    // 导航分类

    myAjax();


    $.ajax({
        url: 'http://lhb.caiyunsecurity.com/index.php/api/exchange',
        type: 'get',
        success: function (data) {
            console.log(data)
            var html='';
            for(var i=0;i<data.data.length;i++){
                html +=`
              <option value="${data.data[i].id}">${data.data[i].name}</option>
               `;
            }
            $('.optionselect').html(html);
            $('.optionselect1').html(html);
            $(".optionselect0").html(html);
            $(".optionselect2").html(html)
            console.log(data.data[0].name);


        }
    })
})
$(".optionselect0").on("change",function (e) {

    sessionStorage.setItem("currentValue0",e.target.value)
});
$(".optionselect").on("change",function (e) {

    sessionStorage.setItem("currentValue",e.target.value)
});
$(".optionselect1").on("change",function (e) {

    sessionStorage.setItem("currentValue1",e.target.value)
});
$(".optionselect2").on("change",function (e) {

    sessionStorage.setItem("currentValue2",e.target.value)
});
$("#input1").on("change",function (e) {

    sessionStorage.setItem("basevalue1",e.target.value)
})
$("#input0").on("change",function (e) {

    sessionStorage.setItem("basevalue0",e.target.value)
})
$("#input4").on("change",function (e) {

    sessionStorage.setItem("basevalue4",e.target.value)
})

$("#input1").on("keyup",function(e){
    var currentValue= sessionStorage.getItem("currentValue")
    $.ajax({

        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol/searchbase?id=${currentValue}&&base=${e.target.value}`,

        type:"get",
        success:function(data){
            // console.log(data)
            var html='';
            for( var i in data.data){
                html +=`

                        <li class="option1" data-tag=${data.data[i]}>${data.data[i]}</li>

                        `
            }
            //console.log(html)
            // $('.datalist1').html(html);
            if (html) {
                $(".datalist1").html(html);
                $(".datalist1").css("display", "block")
            }

        },

    })
    //console.log()
    // console.log(e.target.value)
});
$("#input4").on("keyup",function(e){
    var currentValue1= sessionStorage.getItem("currentValue1")
    $.ajax({

        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol/searchbase?id=${currentValue1}&&base=${e.target.value}`,

        type:"get",
        success:function(data){
            // console.log(data)
            var html='';
            for( var i in data.data){
                html +=`

                        <li class="option3" data-tag=${data.data[i]}>${data.data[i]}</li>

                        `
            }
            //console.log(html)
            // $('.datalist1').html(html);
            if (html) {
                $(".datalist3").html(html);
                $(".datalist3").css("display", "block")
            }

        },

    })
    //console.log()
    // console.log(e.target.value)
});
$("#input0").on("keyup",function(e){
    var currentValue0= sessionStorage.getItem("currentValue0")
    $.ajax({

        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol/searchbase?id=${currentValue0}&&base=${e.target.value}`,

        type:"get",
        success:function(data){
            // console.log(data)
            var html='';
            for( var i in data.data){
                html +=`

                        <li class="option0" data-tag=${data.data[i]}>${data.data[i]}</li>

                        `
            }
            //console.log(html)
            // $('.datalist1').html(html);
            if (html) {
                $(".datalist0").html(html);
                $(".datalist0").css("display", "block")
            }

        },

    })
    //console.log()
    // console.log(e.target.value)
});

$("#input10").on("keyup",function(e){
    var currentValue2= sessionStorage.getItem("currentValue2")
    $.ajax({

        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol/searchbase?id=${currentValue2}&&base=${e.target.value}`,

        type:"get",
        success:function(data){
            // console.log(data)
            var html='';
            for( var i in data.data){
                html +=`

                        <li class="option93" data-tag=${data.data[i]}>${data.data[i]}</li>

                        `
            }
            //console.log(html)
            // $('.datalist1').html(html);
            if (html) {
                $(".datalist93").html(html);
                $(".datalist93").css("display", "block")
            }

        },

    })
    //console.log()
    // console.log(e.target.value)
});

// $(".datalist1div").on("blur","input",function(e) {
//     console.log("wwww")
//          $(".datalist1").css("display","none")
// })
$("#input88").on("keyup",function(e){
    var currentValue= sessionStorage.getItem("currentValue")

    var basevalue=$(".datalist1 li").html()
    $.ajax({

        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol/searchQuote?id=${currentValue}&&base=${basevalue}&&quote=${e.target.value}`,

        type:"get",
        success:function(data){
            //console.log(data)
            var html='';
            for( var i in data.data){
                html +=`

                       <li class="option2" data-tag=${data.data[i]}>${data.data[i]}</li>

                        `
            }
            // console.log(html)

            if (html) {
                $(".datalist5").html(html);
                $(".datalist5").css("display", "block")
            }
        }

    })


});
$("#input22").on("keyup",function(e){
    var currentValue1= sessionStorage.getItem("currentValue1")
    console.log(currentValue1)

    var basevalue1=$(".datalist3 li").html()
    console.log(basevalue1)
    $.ajax({

        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol/searchQuote?id=${currentValue1}&&base=${basevalue1}&&quote=${e.target.value}`,

        type:"get",
        success:function(data){
            console.log(data)
            var html='';
            for( var i in data.data){
                html +=`

                       <li class="option4" data-tag=${data.data[i]}>${data.data[i]}</li>

                        `
            }
            // console.log(html)

            if (html) {
                $(".datalist4").html(html);
                $(".datalist4").css("display", "block")
            }
        }

    })

    console.log(e.target.value)
});
$("#input00").on("keyup",function(e){
    var currentValue0= sessionStorage.getItem("currentValue0")

    var basevalue0=$(".datalist0 li").html()
    $.ajax({

        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol/searchQuote?id=${currentValue0}&&base=${basevalue0}&&quote=${e.target.value}`,

        type:"get",
        success:function(data){
            //console.log(data)
            var html='';
            for( var i in data.data){
                html +=`

                       <li class="option00" data-tag=${data.data[i]}>${data.data[i]}</li>

                        `
            }
            // console.log(html)

            if (html) {
                $(".datalist00").html(html);
                $(".datalist00").css("display", "block")
            }
        }

    })


});
$("#input010").on("keyup",function(e){
    var currentValue2= sessionStorage.getItem("currentValue2")

    var basevalue93=$(".datalist93 li").html()
    $.ajax({

        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol/searchQuote?id=${currentValue2}&&base=${basevalue93}&&quote=${e.target.value}`,

        type:"get",
        success:function(data){
            //console.log(data)
            var html='';
            for( var i in data.data){
                html +=`

                       <li class="option94" data-tag=${data.data[i]}>${data.data[i]}</li>

                        `
            }
            // console.log(html)

            if (html) {
                $(".datalist94").html(html);
                $(".datalist94").css("display", "block")
            }
        }

    })


});
$(".datalist5").on('click','.option2',function(e){
    var value=$(".option2").attr("data-tag");
    console.log(value)
    $("#input88").val(value)
    $(".datalist5").css("display","none")
})
$(".datalist4").on('click','.option4',function(e){
    var value=$(".option4").attr("data-tag");
    console.log(value)
    $("#input22").val(value)
    $(".datalist4").css("display","none")
})

$(".datalist1").on('click','.option1',function(e){
    var value=$(this).attr("data-tag");
    console.log(value)
    $("#input1").val(value)
    $(".datalist1").css("display","none")
})
$(".datalist3").on('click','.option3',function(e){
    var value=$(this).attr("data-tag");
    console.log(value)
    $("#input4").val(value)
    $(".datalist3").css("display","none")
})
$(".datalist0").on('click','.option0',function(e){
    var value=$(this).attr("data-tag");
    console.log(value)
    $("#input0").val(value)
    $(".datalist0").css("display","none")
})
$(".datalist00").on('click','.option00',function(e){
    var value=$(this).attr("data-tag");
    console.log(value)
    $("#input00").val(value)
    $(".datalist00").css("display","none")
})
$(".datalist93").on('click','.option93',function(e){
    var value=$(this).attr("data-tag");
    console.log(value)
    $("#input10").val(value)
    $(".datalist93").css("display","none")
})
$(".datalist94").on('click','.option94',function(e){
    var value=$(this).attr("data-tag");
    console.log(value)
    $("#input010").val(value)
    $(".datalist94").css("display","none")
})


$(".content1").on("click",".deleteData",function(e){

                    var idValue=$(this).attr('data-ta')


                    $.ajax({
                        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol_rule/delete/id/${idValue}`,
                        type:"get",
                        success:function (data) {
                            console.log(data)
                            alert("删除成功")
                            myAjax();

            }

        })


})
$("#forthchild1 a").click(function () {
    console.log("xx")
    var type=$(".optionselect").val();
    var  base=$("#input1").val();
    var quote=$("#input88").val();
    var interval=$("#input2").val();
    var amplitude=$("#input3").val();
    var exchange_id=$(".optionselect").find("option:selected").attr('value')
    console.log(exchange_id)

    $.ajax({
        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol_rule/save`,
        type:"post",
        data:{
            type:type,
            base:base,
            quote:quote,
            interval:interval,
            amplitude:amplitude,
            exchange_id:exchange_id


        },
        success:function (data) {
        console.log(data)
            myAjax();


        }

    })
})
$("#forthchild2 a").click(function () {
    console.log("xxxx")
    var type=$(".optionselect1").val();
    var  base=$("#input4").val();
    var quote=$("#input22").val();
    var amplitude=$("#input5").val();
    var exchange_id=$(".optionselect1").find("option:selected").attr('value')
    console.log(exchange_id)

    $.ajax({
        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol_rule/save`,
        type:"post",
        data:{
            type:type,
            base:base,
            quote:quote,
            amplitude:amplitude,
            exchange_id:exchange_id

        },
        success:function (data) {
            console.log("mm"+data)
            myAjax();


        }

    })
})
$("#forthchild0 a").click(function () {
    console.log("xxxx")
    var type=$(".optionselect0").val();
    var  base=$("#input0").val();
    var quote=$("#input00").val();
    var base_price=$("#input02").val();
    var amplitude =$("#input03").val();
    var exchange_id=$(".optionselect0").find("option:selected").attr('value')
    console.log("id"+exchange_id)

    $.ajax({
        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol_rule/save`,
        type:"post",
        data:{
            type:type,
            base:base,
            quote:quote,
            amplitude:amplitude,
            exchange_id:exchange_id,
            base_price:base_price,

        },
        success:function (data) {
            console.log("mm"+data)
            myAjax();


        }

    })
})
$("#forthchild11 a").click(function () {
    console.log("xxxx")
    var type=$(".optionselect2").val();
    var  base=$("#input10").val();
    var quote=$("#input010").val();
    var interval=$("#input11").val();
    var min_price=$("#input13").val();
   var max_price=$("#input12").val();
    var exchange_id=$(".optionselect2").find("option:selected").attr('value')
    console.log(exchange_id)

    $.ajax({
        url:`http://lhb.caiyunsecurity.com/index.php/api/symbol_rule/save`,
        type:"post",
        data:{
            type:type,
            base:base,
            quote:quote,
            interval:interval,
            min_price:min_price,
            max_price:max_price,
            exchange_id:exchange_id,

        },
        success:function (data) {
            console.log("mm"+data)
            pagefunc(storeData,page,pagesize)


        }

    })
})
$(document).ready(function(){
    $(".datalist0div input").click(function(){
        var thisinput=$(this);
        var thisul=$(this).parent().find("ul");
        if(thisul.css("display")=="none"){
            if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" })};
            thisul.fadeIn("100");
            thisul.hover(function(){},function(){thisul.fadeOut("100");})
            thisul.find("li").click(function(){thisinput.val($(this).text());thisul.fadeOut("100");}).hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});
        }
        else{
            thisul.fadeOut("fast");
        }
    })
})
$(document).ready(function(){
    $(".datalist1div input").click(function(){
        var thisinput=$(this);
        var thisul=$(this).parent().find("ul");
        if(thisul.css("display")=="none"){
            if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" })};
            thisul.fadeIn("100");
            thisul.hover(function(){},function(){thisul.fadeOut("100");})
            thisul.find("li").click(function(){thisinput.val($(this).text());thisul.fadeOut("100");}).hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});
        }
        else{
            thisul.fadeOut("fast");
        }
    })
})





