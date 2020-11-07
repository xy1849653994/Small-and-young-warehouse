

$(function(){
//1画图  2获取图画上每个点信息  3 点信息存入points 包括rgba()和xy 4 
let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")
let Wi=$(window).width()
let Hi=$(window).height()
let count_xsd
let Xrule=$("#Xzhou").val()
let Yrule=$("#Yzhou").val()
$("#Xzhou").change(function(){Xrule=$("#Xzhou").val()})
$("#Yzhou").change(function(){Yrule=$("#Yzhou").val()})
let Ts=$("#Time_dul").val()*80//总步数
$("#Time_dul").change(function(){Ts=$("#Time_dul").val()*80})
canvas.width=Wi
canvas.height=Hi
let imgs=$("#Tupian").val()
$("#Tupian").change(function(){imgs=$("#Tupian").val()})
let points=[]
$("canvas").click(function(e){
points=[]
let xo=e.clientX
let yo=e.clientY
let theimg=new Image()
	theimg.src=imgs
	theimg.onload=function(){
	ctx.drawImage(theimg,100,50)
	pot(xo,yo)
	}
return false
})
//获取图片的信息并存入points
function pot(xo,yo){
	let imgdata=ctx.getImageData(0, 0, Wi, Hi);
	for(let x=0;x<imgdata.width;x++){
		for(let y=0;y<imgdata.height;y++){
			i=(y*imgdata.width+x)*4
			if(imgdata.data[i+3]>0){
				let pots=new newpot(x,y,xo,yo,Ts,imgdata.data[i],imgdata.data[i+1],imgdata.data[i+2],imgdata.data[i+3])
				points.push(pots)
			}
		}
	}
	count_xsd=points.length
	console.log(count_xsd)
//运行函数
draw_img()
}
//
function draw_img(){
rid = window.requestAnimationFrame(draw_img);//动画
	ctx.clearRect(0,0,Wi,Hi)
	points.forEach(function(value,index){
		value.cul();
		value.draw()
	})
}
//构造函数 规则 
class newpot{
	constructor(x,y,Xn,Yn,Ts,r,g,b,a){
		this.x=x,//结束点
		this.y=y,
		this.xd=0,
		this.yd=0,
		this.Ts=Ts,//总步骤
		this.Ti=0,//第i步
		this.Xn=Xn,//初始点
		this.Yn=Yn,
		this.over=false,
		this.beginT=-parseInt(Math.random()*Ts)
		this.rgba="rgba("+r+","+g+","+b+","+a+")"
	}
	draw(){//画每一个像素
		ctx.beginPath();
  	  	ctx.fillStyle = this.rgba;
    	ctx.fillRect(this.xd, this.yd, 1, 1);
	}
	cul(){//计算每一步的像素位置
		if(this.beginT<=0){this.beginT++;return false}
		if(this.Ti>=this.Ts){if(!this.over){ count_xsd-- ;this.over=true;if( count_xsd<=0){ window.cancelAnimationFrame(rid)}}return false}
		this.xd=ani[Xrule](1,this.Ti,this.Xn,this.x-this.Xn,this.Ts)
		this.yd=ani[Yrule](1,this.Ti,this.Yn,this.y-this.Yn,this.Ts)
		this.Ti++
	}
}
})



