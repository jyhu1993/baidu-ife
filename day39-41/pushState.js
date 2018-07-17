//运用pushState的方法记录页面状态；
//根据选项框的选中状态设置页面状态；
function recordWebState(){
	var regionList = document.querySelector("#region-select").childNodes;
	var productList = document.querySelector("#product-select").childNodes;
	var regionArr = [];
	var productArr = [];
	for (var i = regionList.length - 1; i >= 0; i--) {
		if(regionList[i].checked){
			 regionArr.push(regionList[i].value);
		}
	}
	var regionHash = regionArr.toString().replace(/,/g,'#');
	for (var i = productList.length - 1; i >= 0; i--) {
		if(productList[i].checked){
			productArr.push(productList[i].value);	
		}
	}
	var productHash = productArr.toString().replace(/,/g,'#');
	var hash = regionHash + '#' + productHash;
	var state =  {
		regionArr:regionArr,
		productArr:productArr
	};
	var url = window.location.href;
	
	window.history.pushState(state,'',url + '#'+ hash);

}


//根据存储的state状态，改变选中框；
function changeContent(){
	var state = window.history.state;
	//第一次刷新或者在新窗口加载；
	if (state == null) {
		checkAccordingHash();
	}else{
		var regionArr = state.regionArr;
		var productArr = state.productArr;
		var region = document.querySelector("#region-select").childNodes;
		var product = document.querySelector("#product-select").childNodes;
		//清除当前选中状态；
		for (var i = 0; i < region.length; i++) {
			region[i].checked = '';
		}
		for (var i = 0; i < product.length; i++) {
			product[i].checked = '';
		}
		//重新设置当前选中状态；
		for (var i = regionArr.length - 1; i >= 0; i--) {
			for (var j = region.length - 1; j >= 0; j--) {
				if (regionArr[i] == region[j].value) {
					region[j].checked = true;
				}
			}
		}
		for (var i = productArr.length - 1; i >= 0; i--) {
			for (var j = product.length - 1; j >= 0; j--) {
				if (productArr[i] == product[j].value) {
					product[j].checked = true;
				}
			}
		}
	}
}
