var SVG_NS = 'http://www.w3.org/2000/svg';
		var svg = document.createElementNS(SVG_NS,"svg");
		var graph = document.getElementById("graph");
		graph.appendChild(svg);
		//定义svg的默认尺寸；
		var svgSize = {
			height: 300,
			width: 500
		};

		svg.setAttribute("height",svgSize.height);
		svg.setAttribute("width",svgSize.width);
		//定义柱的默认样式；
		var defaultStyle = 'fill:#2E86C1';
		//设置默认图表；
		var saleArr = sourceData[2].sale;
		//调用缩放函数，处理数据;
		var barScale = arrScale(svgSize.height,saleArr);
		var scale = barScale.scale;
		var barHeightArr = barScale.heightArr;
		var maxValue = barScale.maxValue;
		//调用绘图函数；
		drawGraph(scale,barHeightArr,maxValue);


function barGraph(){
	//鼠标滑过表格时获取数据；
	document.getElementById("table-wrapper").addEventListener('mouseover', function(){
		var target = event.target;
		var saleArr = [];
		if (target.nodeName.toLowerCase() == "td") {
			document.getElementsByTagName('svg')[0].innerHTML = "";
			var tdList = target.parentNode.childNodes;
			for (var i = tdList.length-1; i >= tdList.length-12; i--) {
				saleArr.unshift(tdList[i].innerHTML);
			}
			//调用缩放函数，处理数据;
			var barScale = arrScale(svgSize.height,saleArr);
			var scale = barScale.scale;
			var barHeightArr = barScale.heightArr;
			var maxValue = barScale.maxValue;
			//调用绘图函数；
			drawGraph(scale,barHeightArr,maxValue);
	    }
	},false);
}

//获取销售数据，得到最大值，并与定义的窗口尺寸折算比例；
function arrScale(areaSize,saleArr){
	var maxValue = Math.max.apply(Math,saleArr);
	var scale = areaSize / maxValue;
	var heightArr = saleArr.map(function(item,index,saleArr){
		return item * scale;
	});
	return {
		maxValue:maxValue,
		scale:scale,
		heightArr:heightArr
	};
}
//封装绘图函数；
function drawGraph(scale,barHeightArr,maxValue){
		
			//遍历高度数组，绘制柱状；
			for (var i = 0; i < barHeightArr.length; i++) {
				var bar = document.createElementNS(SVG_NS,"rect");
				svg.appendChild(bar);
				bar.setAttribute("width", 30);
				bar.setAttribute("height",barHeightArr[i]);
				bar.setAttribute("x",40*i+5);
				bar.setAttribute("y",svgSize.height-barHeightArr[i]);
				bar.setAttribute("style",defaultStyle);
			}
			//绘制横轴和纵轴；
			//横轴的默认位置及样式；
			var xAxisStyle = {
				x1: "-4",
				y1: svgSize.height,
				x2: svgSize.width,
				y2: svgSize.height,
				style:"stroke:black;stroke-width:2"
			};
			
			if (maxValue > 100) {
				//以100为间隔，根据最大值确认画几条横轴；
				var gap = 100;
				var xAxisNum = Math.ceil(maxValue / gap);
			}else{
				//以20为间隔，根据最大值确认画几条横轴；
				var gap = 20;
				var xAxisNum = Math.ceil(maxValue / gap);

			}
			
			for (var i = 0; i < xAxisNum; i++) {
				var xAxis = document.createElementNS(SVG_NS,"line");
				svg.appendChild(xAxis);
				xAxisStyle.y1 = svgSize.height - i*gap*scale;
				xAxisStyle.y2 = svgSize.height - i*gap*scale;
				for (var xPropName in xAxisStyle) {
					xAxis.setAttribute(xPropName,xAxisStyle[xPropName]);
				}
				//除最下面的横轴外，其余横轴变更样式；
				xAxisStyle.style = "stroke:gray;stroke-width:1";
			}

			//纵轴的默认位置及样式；
			var yAxis = document.createElementNS(SVG_NS,"line");
			svg.appendChild(yAxis);
			//纵轴的默认位置及样式；
			var yAxisStyle = {
				x1: "0",
				y1: svgSize.height,
				x2: "0",
				y2: "0",
				style:"stroke:black;stroke-width:2"
			};
			for (var yPropName in yAxisStyle) {
				yAxis.setAttribute(yPropName,yAxisStyle[yPropName]);
			}
			//为纵轴添加文本；
			//纵轴上面的刻度文本样式及初始位置；
			var yAxisValueStyle = {
				x:"-5",
				y:svgSize.height,
				style:"text-anchor:end"
			} ;

			for (var i = 0; i < xAxisNum; i++) {
				var yText = document.createElementNS(SVG_NS,"text");
				var yAxisValue = 0+gap*i;
				var yTextNode = document.createTextNode(yAxisValue);
				yText.appendChild(yTextNode);
				svg.appendChild(yText);
				yAxisValueStyle.y = svgSize.height - i*gap*scale+4;
				for(var yTextProp in yAxisValueStyle){
					yText.setAttribute(yTextProp,yAxisValueStyle[yTextProp]);
				}
			}
			//横轴上面的刻度标识；
			//横轴上面的文本样式及出事位置；
			var xAxisValueStyle = {
				x:"20",
				y:svgSize.height + 20,
				style:"text-anchor:middle"
			};
			for (var i = 0; i < barHeightArr.length; i++) {
				var xText = document.createElementNS(SVG_NS,"text");
				var monthArr = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
				var xTextNode = document.createTextNode(monthArr[i]);
				xText.appendChild(xTextNode);
				svg.appendChild(xText);
				xAxisValueStyle.x = 20*(2*i+1);
				for(var xTextProp in xAxisValueStyle){
					xText.setAttribute(xTextProp,xAxisValueStyle[xTextProp]);
				}
			}
		}

