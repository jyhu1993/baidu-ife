    //获取选中对象的数据并进行处理；
	function getData(argument){
		var region = document.getElementsByName("region");
		var product = document.getElementsByName("product");
		var regionArr = [];
		var productArr = [];
		var saleArr = [];
		var mergeArr = [];
		//通过选状态来获取选中数据；
		for (var i = 0; i < region.length; i++) {
			if (region[i].checked) {
				regionArr.push(region[i].value);
			}
		}
		for (var i = 0; i < product.length; i++) {
			if(product[i].checked){
				productArr.push(product[i].value);
			}
		}

		var h = 0;
		//匹配同时满足地区和商品的对象；
		for (var i = 0; i < productArr.length; i++) {
			for (var j = 0; j < regionArr.length; j++) {
				for (var k = 0; k < argument.length; k++) {
					if (regionArr[j] == argument[k].region && productArr[i] == argument[k].product) {
						var mergeArrChild = [];
						//按不同选中数量输出不同顺序；
						if ((productArr.length == 1 && regionArr.length == 1) || (productArr.length > 1 && regionArr.length > 1) || (productArr.length == 1 && regionArr.length > 1)) {
							mergeArrChild.push(argument[k].product,argument[k].region);
							mergeArrChild = mergeArrChild.concat(argument[k].sale);
							mergeArr[h] = mergeArrChild;
							h++;
						}
						if (productArr.length > 1 && regionArr.length == 1) {
							mergeArrChild.push(argument[k].region,argument[k].product);
							mergeArrChild = mergeArrChild.concat(argument[k].sale);
							mergeArr[h] = mergeArrChild;
							h++;
						}
					}
				}	
			}
		}
		return {regionLength:regionArr.length,
				productLength:productArr.length,
				mergeArr:mergeArr};
	}