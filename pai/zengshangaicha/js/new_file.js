let addbtn=document.getElementsByClassName("addbtn")[0];
let add=document.getElementsByClassName("add")[0];
let sac=document.getElementsByClassName("sac")[0];
let searchbtn=document.getElementsByClassName("searchbtn")[0];
let result = document.getElementsByClassName("result")[0];
let rvs = document.getElementsByClassName("rvs")[0];
let ul1=document.getElementById("ul1");
addbtn.onclick=function(){
    add.style.display="block";
}
searchbtn.onclick=function(){
    sac.style.display="block";
}
function cancle_4(){
    rvs.style.display="none";
}
function cancel(){
    add.style.display="none";
}
function cancel_2(){
    sac.style.display="none";
}
function cancel_3(){
    result.style.display="none";
}
let addipt=document.getElementsByClassName("addipt");
function addRow(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/food/add',
        data:{
            name:addipt[0].value,
            price:addipt[1].value,
            desc:addipt[2].value,
            typename:addipt[3].value,
            typeid:addipt[4].value,
        },
        success:function(res){
            chagePage();
            console.log(res);
        }
    })
}
function revise(event){
    rvs.style.display="block";
    id=event.parentNode.getElementsByTagName('span')[0];
}
function A(){
    let data=document.getElementsByClassName("rvsipt");
    $.ajax({
        type:"post",
        url:'http://118.195.129.130:3000/food/update',
        data:{
            name:data[0].value,
            price:data[1].value,
            desc:data[2].value,
            typename:data[3].value,
            typeid:data[4].value,
            _id:id.innerHTML,
        },
        success:function(res){
            console.log(res);
            cancle_4()
            chagePage()
        }
    })
}
let searchipt=document.getElementsByClassName("searchipt");
function search(){
    result.style.display="block";
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/food/getInfoByKw",
        data:{
            kw:searchipt[0].value,
        },
        success:function(res){
            let data=res.data;
            console.log(res);
            cancel_2();
            for(let i =0;i<data.length;i++){
                ul2.innerHTML+="<tr> <td>"+data[i].name+"</td><td>"
                    +data[i].price+"</td><td>"
                    +data[i].desc+"</td><td>"
                    +data[i].typename+"</td><td>"
                    +data[i].typeid
                    +"</td><td><button onclick='revise(this);'>修改</button> <button onclick='delRow(this);'>删除</button><span style='display: none;'>"+data[i]._id+"</span></td></tr>"
                
           }
        }
    })
}
function chagePage(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/food/getInfoByPage',
        data:{
            page:1,
            per_page:10
        },
        success:function(res){
            ul1.innerHTML="";
            let data=res.data;
            console.log(res);
            for(let i =0;i<data.length;i++){
                ul1.innerHTML+="<tr> <td>"+data[i].name+"</td><td>"
                    +data[i].price+"</td><td>"
                    +data[i].desc+"</td><td>"
                    +data[i].typename+"</td><td>"
                    +data[i].typeid
                    +"</td><td><button onclick='revise(this);'>修改</button> <button onclick='delRow(this);'>删除</button><span style='display: none;'>"+data[i]._id+"</span></td></tr>"
                
           }
        },
        error:function(err){
            console.log(err);
        }
    })
}
chagePage()
function delRow(event){
    let id =event.parentNode.getElementsByTagName('span')[0];
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/food/del',
        data:{
            _id:id.innerHTML,
        },
        success:function(res){
            chagePage();
            console.log(res);
        }
    })
}