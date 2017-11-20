window.onload=function(){
	var canva = document.getElementById('canva');
	var context = canva.getContext('2d');
	hash=[
		brush=["8px","10px","16px","brush"],
		eraser=["6px","10px","15px","ceraser"],
		color=["red","yellow","blue","color"]
	]
	var brushHeight = 10;
	var eraserWH = 100;
	var Color = "black";
	//初始化select
	var selectAll = document.getElementById("selectAll"); 
	var selectDiv = document.getElementById("select"); 
	var eraser = document.getElementById("eraser"); 
	var brush = document.getElementById("brush"); 
	var color = document.getElementById("color");
	var emptying =  document.getElementById("emptying");
	var  downSave=  document.getElementById("downSave");
	var main = document.getElementById("main");
	var caidan = document.getElementById("caidan");
	for(var i=0;i<hash.length;i++){
		var cUl = create("ul",selectDiv,hash[i]);
		for (var j=0;j<hash[i].length-1;j++){
			var cLi = create("li",cUl,null,null,hash[i][j]);
			if(i==0){
				var cHr = create("hr",cLi,null,null,hash[i][j],hash[i][j]);
				cLi.onclick=function(){
					console.log(parseInt(this.children[0].index))
					brushHeight=parseInt(this.children[0].index);
					this.parentNode.style.opacity=0;
					clearOnOff =false;
					setTimeout(function () {
                selectAll.style.display="none";
            },1000);
				}
			}
			if(i==1) {
				var ceraserDiv = create("div",cLi,"ceraser1",null,hash[i][j],hash[i][j],hash[i][j]);
				// eraserWH=parseInt(this.children[0].index);
				cLi.onclick=function(){
					clearOnOff =true;
					eraserWH=parseInt(this.children[0].index);
					this.parentNode.style.opacity=0;
					setTimeout(function () {
                selectAll.style.display="none";
            },1000);
				}
			}
			if(i==2) {
				cLi.style.background=hash[i][j];
				cLi.onclick=function(){
					Color =this.index;
					this.parentNode.style.opacity=0;
					setTimeout(function () {
                selectAll.style.display="none";
            },1000);
				}
			} 
		}

		
	}
	//设置canvas大小
	var pageWidth =document.documentElement.clientWidth;
	var pageHeight =document.documentElement.clientHeight;
	canva.width=pageWidth;
	canva.height=pageHeight;
	var onOff = false;
	var clearOnOff =false;
	var lastPoint={x:null,y:null}
	var newPoint={x:null,y:null}
	if("ontouchstart" in document){
		document.ontouchstart=function(event){
			var touchesX=event.touches[0].clientX;
			var touchesY=event.touches[0].clientY;
			onOff = !onOff;
			if(onOff){
				if(clearOnOff){
					clear1(touchesX, touchesY, eraserWH, eraserWH);
				}else{
				// drawc(event.clientX,event.clientY,brushHeight/2,Color)
				//避免点按钮时画圆。
				}
			lastPoint={x:touchesX,y:touchesY}
			}
		}
		document.ontouchmove=function(event){
			var touchesX=event.touches[0].clientX;
			var touchesY=event.touches[0].clientY;
			newPoint={x:touchesX,y:touchesY}
			if(onOff){
				if(clearOnOff){
					clear1(touchesX, touchesY, eraserWH, eraserWH);
  				}else{

  					drawc(touchesX,touchesY,brushHeight/2,Color)
  					drawline(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y,brushHeight,Color)
  				}
  				lastPoint=newPoint;
  			}
		}
		document.ontouchend=function(){
			onOff=!onOff;
		}
	}else{
		document.onmousedown=function(event){
			onOff = !onOff;
			if(onOff){
			if(clearOnOff){
				clear1(event.clientX, event.clientY, eraserWH, eraserWH);
			}else{
				// drawc(event.clientX,event.clientY,brushHeight/2,Color)
				//避免点按钮时画圆。
			}
			lastPoint={x:event.clientX,y:event.clientY}
		}

		}
		document.onmousemove=function(event){
			newPoint={x:event.clientX,y:event.clientY}
			if(onOff){
				if(clearOnOff){
					clear1(event.clientX, event.clientY, eraserWH, eraserWH);
  				}else{
  					drawc(event.clientX,event.clientY,brushHeight/2,Color)
  					drawline(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y,brushHeight,Color)
  				}
  				lastPoint=newPoint;
  			}
		}
	
		document.onmouseup=function(){
			onOff=!onOff;
		}
	}
	
	var oUl=queryselector(selectDiv,'ul') 
	eraser.onclick=function(){
		// clearOnOff =true;
		selectAll.style.display="block"
		setTimeout(function () {
                oUl[1].style.opacity=1;
            },1);
	}
	brush.onclick=function(){
		clearOnOff =false;
		selectAll.style.display="block"
		setTimeout(function () {
                oUl[0].style.opacity=1;
            },1);
		
	}
	color.onclick=function(){
		selectAll.style.display="block"
		setTimeout(function () {
                oUl[2].style.opacity=1;
            },1);
	}
	emptying.onclick=function(){
		
		context.clearRect(0, 0, canva.width, canva.height);
	}
	downSave.onclick=function(){
		var url = canva.toDataURL("image/png");
		var a = create("a",document.body)
		a.href=url;
		a.download="wo";
		a.click();
	}
	var caidanOnOff = true;
	caidan.onclick=function(){
		if(caidanOnOff){
			main.style.display="none";
			caidan.textContent="展开";
			caidanOnOff = !caidanOnOff;
		}else{
			main.style.display="block";
			caidan.textContent="收起";
			caidanOnOff = !caidanOnOff;
		}
	}
	//以下工具函数
	function drawline(x1,y1,x2,y2,width,color){
		context.beginPath();
		context.strokeStyle = color
		context.moveTo(x1,y1);
		var lineWidth =context.lineWidth=width;
		context.lineTo(x2,y2);
		context.stroke();
		context.closePath();
	}
	function drawc(X,Y,Z,color){
		context.beginPath();
  		context.fillStyle = color
  		context.arc(X,Y, Z, 0, 360);
  		context.fill();
	}
	function clear1(X,Y,width,height){
		context.clearRect(X-width/2, Y-height/2, width, height);
	}
	function queryselector(element,tagName){
		return element.querySelectorAll(tagName)
	}
	function create(tagName,fuji,classname,content,subscript,height,width){
	    var Element = document.createElement(tagName);
	    Element.className=classname;
	    Element.textContent=content;
	    Element.index=subscript;
	    Element.style.height=height;
	    Element.style.width=width;
	    fuji.appendChild(Element);
	    return Element
	}
}