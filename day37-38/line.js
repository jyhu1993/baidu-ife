//创建canvas标签；
	var canvas = document.createElement("canvas");
	var svg = document.getElementsByTagName("svg")[0];
	svg.parentNode.insertBefore(canvas,svg);
	var ctx = canvas.getContext('2d');
	//定义画布的尺寸；
	var canvasSize = {
		height:"330",
		width:"535"
	};
	canvas.setAttribute("height",canvasSize.height);
	canvas.setAttribute("width",canvasSize.width);

	//定义数据点的间隔；
	var num = 40;
	//设置默认图表；
	drawLineGraph(JSON.parse(localStorage.Data)[2].sale);

function lineGraph(){	
	//鼠标滑过表格时获取销售数据,并结合画布高度进行缩放；
	document.getElementById("table-wrapper").addEventListener('mouseover',function(){
		var target = event.target;
		var saleArr = [];
		if (target.nodeName.toLowerCase() == "td") {
			canvas.height = canvas.height;
			var tdList = target.parentNode.childNodes;
			for (var i = tdList.length-1; i >= tdList.length-12; i--) {
				var num = parseInt(tdList[i].innerText);
				if (!isNaN(num)) {
					saleArr.unshift(num);
				}else{
					saleArr.unshift(tdList[i].firstChild.value);
				}
			}
			drawLineGraph(saleArr);
	}
	},false);		
}
//封装绘图函数；
function drawLineGraph(saleArr){
			var maxValue = Math.max.apply(Math,saleArr);
			var scale = (canvasSize.height-30-10) / maxValue;
			var dotHeightArr = saleArr.map(function(item,index,saleArr){
				return item * scale;
			});
			//绘制坐标轴；
			//绘制x轴及定义纵轴的刻度值；
			if (maxValue > 200) {
				var gap = 100;		
			}else if (maxValue > 100 && maxValue <= 200) {
				var gap = 50;
			}else if(maxValue > 50 && maxValue <= 100) {
				var gap = 20;
			}else{
				var gap = 10;			
			}
			var xAxisNum = Math.ceil(maxValue / gap);
			
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			for (var i = 0; i < xAxisNum; i++) {
				var xAxisHeight = canvasSize.height-i*gap*scale-30;
				ctx.beginPath();
				ctx.moveTo(30,xAxisHeight);
				ctx.lineTo(canvasSize.width,xAxisHeight);
				ctx.stroke();
				ctx.strokeStyle = "gray";
				ctx.lineWidth = 1;
				//定义刻度值；
				ctx.font="15px sans-serif";
				ctx.fillStyle='black';
				ctx.textAlign='end';
				ctx.fillText(gap*i,30,xAxisHeight+5);
			}
			//绘制纵轴；
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(35,canvasSize.height-30);
			ctx.lineTo(35,0);
			ctx.stroke();
			//给横轴添加文本；
			var monthArr = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
			for (var i = 0; i < monthArr.length; i++) {
				ctx.font="15px sans-serif";
				ctx.fillStyle='black';
				ctx.textAlign='start';
				ctx.fillText(monthArr[i],32+num*i,canvasSize.height-8);
			}

			//遍历数组，创建数据点；
			ctx.fillStyle = "red";	
			for (var i = 0; i < dotHeightArr.length; i++) {
				ctx.beginPath();
				//计算将要绘制的数据点的圆心坐标；
				var x = 35 + num*i;
				var y = canvasSize.height -dotHeightArr[i] - 30;
				ctx.arc(x,y,3,0,Math.PI*2,true);
				ctx.fill();	
			}
			//遍历数组，创建折线；
			ctx.strokeStyle = '#2E86C1';
			ctx.beginPath();
			ctx.moveTo(35,canvasSize.height - dotHeightArr[0] - 30);
			for (var i = 1; i < dotHeightArr.length; i++) {	
				ctx.lineTo(35+num*i,canvasSize.height -dotHeightArr[i]-30);	
			}
			ctx.stroke();
}