//监听表格是否有鼠标划入；
document.getElementById('table-wrapper').addEventListener('mouseover',function(){
	var target = event.target;
	//若鼠标划入的地方是表格中内容为数字的td；
	var tableType = target.nodeName.toLowerCase();
	var dataType = isNaN(target.innerHTML);
	if (tableType == "td" && dataType == false) {
		var spanOld = document.getElementsByTagName('span')[0];
		if (!spanOld) {
			//如果没有spanOld这个元素不做任何动作,else清除span;
		}else{
			spanOld.parentNode.removeChild(spanOld.parentNode.lastChild);
		}

		var span = document.createElement('span');
		var edit = document.createTextNode('编辑');
		span.appendChild(edit);
		target.appendChild(span);

		//调用编辑函数并绑定事件；
		document.getElementsByTagName('span')[0].addEventListener('click',editSheet, false);
	}
},false);

//移出鼠标时'编辑'消失；
document.getElementById('table-wrapper').addEventListener('mouseout',function(){	
	var target = event.target;
	var tableType = target.nodeName.toLowerCase();
	if (tableType == "span") {
		var span = document.getElementsByTagName('span')[0];
		if (span.length == 0) {
			return;
		}else{
			span.parentNode.removeChild(span.parentNode.lastChild);
		}		
	}
},false);


//设置表格内容变为可编辑状态；
function editSheet(){
//判断是否已存在一个input输入框；若有，则点击下一个输入框时取消上一个；
	var btn = document.getElementsByTagName('button');
	console.log(btn);
	if (btn.length > 1) {
		var tdOld = btn[0].parentNode;
		var inputOld = tdOld.childNodes[0];
		tdOld.innerHTML = inputOld.value;
	}	
	//获取正在被点击的span;
	var target = event.target;
	var td = target.parentNode;
	//获取该单元格的数值；
	var sheetNum = parseInt(td.innerHTML);
	//创建input输入框；
	var input = document.createElement('input');
	input.setAttribute('type','text');
	input.setAttribute('value',sheetNum);
	input.setAttribute('name','data');
	td.innerHTML="";
	td.appendChild(input);
	//添加确定和取消按钮；
	var btnEnter = document.createElement('button');
	var btnEnterTxt = document.createTextNode('确定');
	btnEnter.appendChild(btnEnterTxt);
	td.appendChild(btnEnter);
	var btnCancel = document.createElement('button');
	var btnCancelTxt = document.createTextNode('取消');
	btnCancel.appendChild(btnCancelTxt);
	td.appendChild(btnCancel);
	
	//点击取消按钮时，取消编辑框，数字恢复为之前的数字；
	document.getElementsByTagName('button')[1].addEventListener('click',function(){
 		td.innerHTML = sheetNum;
	},false);
	//为esc键绑定同取消一样的事件；为enter绑定确认事件；
	function key(event){
		var keyNum = event.keyCode;
		if (keyNum == 27) {
			td.innerHTML = sheetNum;
		}else if (keyNum == 13) {
			saveData();
		}
	}
	document.onkeydown = key;
	
	//判断输入框中输入的是否为数字；
	input.onblur = function(){
		if (isNaN(input.value)) {
			alert('请输入正确的数字');
		}
	};
	//存储数据的函数；
	function saveData(){		
		td.innerHTML = input.value;	
		//利用localStorage存储数据的函数,初始化savaData的值；
		var saveData = sourceData;
		//获取更改后的行的销售数据；
		var updateSaleArr = [];
		var tr = td.parentNode.childNodes;//数组；
		for (var i = 2; i < tr.length; i++) {
			updateSaleArr.push(tr[i].innerHTML);
		}
		for (var i = 0; i < saveData.length; i++) {
			if ((saveData[i].region == tr[0].innerHTML && saveData[i].product == tr[1].innerHTML) || 
				(saveData[i].region == tr[1].innerHTML && saveData[i].product == tr[0].innerHTML)) {
				sourceData[i].sale = updateSaleArr;
			}
		}
		//localStorage只能存储字符串信息，运用JSON进行转化存储；
		localStorage.setItem('Data',JSON.stringify(saveData));		
	}

	//点击确定按钮时，调用存储数据的函数；
	document.getElementsByTagName('button')[0].addEventListener('click',saveData,false);
	
}


	








