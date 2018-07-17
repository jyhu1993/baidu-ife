//该脚本实现的功能为：使用location.hash记录页面状态；
//加载页面时，选项框根据hash选中各项;
function checkAccordingHash(){
	var hash = getHashFromURL();
	var regionArr = hash.regionArr;
	var productArr = hash.productArr;
	var region = document.getElementsByName("region");
	var product = document.getElementsByName("product");
	//当有其他选中项时，取消默认选中项；
	if (regionArr.length != 0) {
		region[0].checked = '';
	}
	if (productArr.length !=0){
		product[0].checked = '';
	}
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



//设置新的hash，点击选项框时调用该函数；
function addHashToURL(){
	var regionList = document.getElementsByName("region");
	var productList = document.getElementsByName("product");
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
	window.location.hash = hash;
}
//解析hash;
function getHashFromURL(){
	var hash = window.location.hash;
	var hashArr = hash.split('#');
	hashArr.shift();
	var regionArr = [];
	var productArr = [];
	for (var i = hashArr.length - 1; i >= 0; i--) {
		var hash = decodeURI(hashArr[i]);
		if (hash == '华南' || hash == '华东' || hash == '华北') {
			regionArr.push(hash);
		}else if (hash == '手机' || hash == '笔记本' || hash == '智能音箱') {
			productArr.push(hash);
		}
	}
	return {
		regionArr:regionArr,
		productArr:productArr
	};
}




