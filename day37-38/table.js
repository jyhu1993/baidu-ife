
//生成表格；
	function newTable(){
		var tableWrapper = document.getElementById("table-wrapper");
		tableWrapper.innerHTML = "";
		var table = document.createElement("table");
		tableWrapper.appendChild(table);
		//获取选中数据；
		if (!JSON.parse()) {
			var mergeArr = getData(sourceData).mergeArr;
			var regionLength = getData(sourceData).regionLength;
			var productLength = getData(sourceData).productLength;
		}else{
			var mergeArr = getData(JSON.parse(localStorage.Data)).mergeArr;
			var regionLength = getData(JSON.parse(localStorage.Data)).regionLength;
			var productLength = getData(JSON.parse(localStorage.Data)).productLength;
		}
		//输出表头;
		var thContent = [];
		if (regionLength == 1 && productLength > 1) {
			thContent = ["地区","商品","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
		}else{
			thContent = ["商品","地区","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
		}
		var trTh = document.createElement("tr");
		table.appendChild(trTh);
		for (var i = 0; i < thContent.length; i++) {
			var th = document.createElement("th");
			var thText = document.createTextNode(thContent[i]);
			th.appendChild(thText);
			trTh.appendChild(th);
		}
		
		//输出行；
		for (var i = 0; i < mergeArr.length; i++) {
			var trTd = document.createElement("tr");
			for (var j = 0; j < mergeArr[i].length; j++) {
				var td = document.createElement("td");
				var tdText = document.createTextNode(mergeArr[i][j]);
				td.appendChild(tdText);
				trTd.appendChild(td);
			}
			table.appendChild(trTd);
		}
	}
	//合并第一列相同的元素为一个单元格；
	function mergeCells(){

		var repeatValue = [];
		var remainValue = [];
		var row = document.getElementsByTagName("table")[0].rows;
		for (var i = 1; i < row.length; i++) {
			if (row[i-1].cells[0].innerHTML == row[i].cells[0].innerHTML) {
				repeatValue.push(row[i].cells[0]);
			}else{
				remainValue.push(row[i].cells[0]);
			}		
		}
		var num = repeatValue.length / remainValue.length;
		for (var i = 0; i < repeatValue.length; i++) {
			//repeatValue[i].parentNode.removeChild(repeatValue[i]);
			//设置为隐藏比删除更好，使数据保持完整，便于后续提取数据；
			repeatValue[i].style.display = 'none';
		}
		for (var i = 0; i < remainValue.length; i++) {
			remainValue[i].rowSpan = num + 1;
		}

	}
