function getStyle(obj,name){
//因为：style(document.getElementById(id).style.XXX)只能获取元素的内联样式，内部样式和外部样式使用style是获取不到的。
//IE下获取元素的实际属性值使用currentStyle属性，getComputedStyle同currentStyle作用相同，但是适用于FF、opera、safari、chrome。但用这种方法在IE7，IE8，IE9获取元素属性值都会报错。

	
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];
	}
}

function getByClass(oParent,nClass) //封装getByClass（JS获取oParent=对象 nClass=class类名的方法封装为一个函数）

{
	var eLe = oParent.getElementsByTagName('*');
	var aRrent  = [];//建立一个数组下标为无限的数组
	for(var i=0; i<eLe.length; i++)
	{
		if(eLe[i].className == nClass)
		{
			aRrent.push(eLe[i]);//往数组最后面增加数组+1
		}
	}
	return aRrent;
}

function startMove(obj,att,add)
{
	clearInterval(obj.timer)//结束定时器
	//定时器开始
	obj.timer = setInterval(function(){
	   var cutt = 0 ;
	   //att='left'
	   if(att=='opacity')
	   {
	   	//cutt=Math.round4舍5入(parseFloat解释字符返回浮点类型())
		   cutt = Math.round(parseFloat(getStyle(obj,att)));
	   }
	   else
	   {   
	   	//cutt=Math.round4舍5入(parseInt整数类型返回())
		   cutt = Math.round(parseInt(getStyle(obj,att)));
	   }
	   var speed = (add-cutt)/4;
	   speed = speed>0?Math.ceil(speed):Math.floor(speed);
	   if(cutt==add)
	   {
		   clearInterval(obj.timer);
	   }
	   else
	   {
		   if(att=='opacity')
		   {
			   obj.style.opacity = (cutt+speed)/100;
			   obj.style.filter = 'alpha(opacity:'+(cutt+speed)+')';
		   }
		   else
		   {
			   obj.style[att] = cutt+speed+'px';
		   }
	   }
	   
	},30)
}

  window.onload = function()
  {
	  var oDiv = document.getElementById('playBox'); 
	  var oPre = getByClass(oDiv,'pre')[0]; //寻找匹配对象的className节点等于“pre”
	  var oNext = getByClass(oDiv,'next')[0];//寻找匹配对象的className节点等于“next”
	  var oUlBig = getByClass(oDiv,'oUlplay')[0];//寻找匹配对象的className节点等于“oUlplay”
	  var aBigLi = oUlBig.getElementsByTagName('li');
	  var oDivSmall = getByClass(oDiv,'smalltitle')[0];//寻找匹配对象的className节点等于“smalltitle”
	  var aLiSmall = oDivSmall.getElementsByTagName('li');
	  
	  function tab()//设置aLiSmall标签下的ClassName 样式
	  {
	     for(var i=0; i<aLiSmall.length; i++)
	     {
		    aLiSmall[i].className = '';//li样式等于空
	     }
	     aLiSmall[now].className = 'thistitle';//设置li样式
	     //oUlBig=ul    
	     startMove(oUlBig,'left',-(now*aBigLi[0].offsetWidth))
	  }
	  var now = 0;
	  for(var i=0; i<aLiSmall.length; i++)
	  {
		  aLiSmall[i].index = i;
		  aLiSmall[i].onclick = function()
		  {
			  now = this.index;
			  tab();
		  }
	 }
	  oPre.onclick = function()
	  {
		  now--;
		  if(now ==-1)
		  {
			  now = aBigLi.length;
		  }
		   tab();
	  }
	   oNext.onclick = function()
	  {
		   now++;
		  if(now ==aBigLi.length)
		  {
			  now = 0;
		  }
		  tab();
	  }
	  var timer = setInterval(oNext.onclick,3000); //滚动间隔时间设置
	  oDiv.onmouseover = function()
	  {
		  clearInterval(timer);
	  }
	   oDiv.onmouseout = function()
	  {
		  timer = setInterval(oNext.onclick,3000); //滚动间隔时间设置
	  }
  }