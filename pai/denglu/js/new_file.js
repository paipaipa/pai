let denglu = document.getElementById("denglu");
let zhuce = document.getElementById("zhuce");
let center = document.getElementsByClassName("center")[0];
let zhuce_center = document.getElementsByClassName("zhuce-center")[0];

zhuce.onclick = function () {
    center.style.display = "none";
    zhuce_center.style.display = "block";
}
denglu.onclick = function () {
    zhuce_center.style.display = "none";
    center.style.display = "block";
}
let landInput =document.getElementsByClassName('landInput');
function land(){
    console.log(landInput[0].value);
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/user/login",
        data:{
            us:landInput[0].value,
            ps:landInput[1].value,
        },
        success:function(res){
            console.log(res);
            if(res.err==0){
            window.location.href="../zengshangaicha/index.html";
            }else{
                alert("账号或密码错误")
            }
        }
    });
}
let registerInput =document.getElementsByClassName('registerInput');
function register(){
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/user/reg",
        data:{
            us:registerInput[0].value,
            ps:registerInput[1].value,
            mail:registerInput[2].value,
            code:registerInput[3].value,
        },
         success:function(res){
             console.log(res);
             if(res.err==0){
                alert("注册成功")
                }else{
                    alert("验证码错误")
                }
        }
    });
}
function sent(){
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/user/getMailCode",
        data:{
            mail:registerInput[2].value,
        },
        success:function(res){
            console.log(res);
            if(res.err==0){
                alert("发送成功")
            }else{
                alert("发送失败,请稍后再试")
            }
        }
    });
}