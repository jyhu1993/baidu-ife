//实现全选逻辑的函数；
	//全选框的点击逻辑；
	function checkAllTwo(name){
		var checkAll = document.getElementsByName(name + "-all")[0];
		var checkbox = document.getElementsByName(name);
		//如果全选框被选中，则3个复选框也被选中；
		if (checkAll.checked) {
			for (var i = 0; i < checkbox.length; i++) {
				checkbox[i].checked = true;
				checkbox[i].disabled = false;
			}
		}
		if (checkbox[0].checked && checkbox[1].checked && checkbox[2].checked) {
			checkAll.checked = true;
		}
	}
	//另外三个复选框的点选逻辑;
	function checkAll(name){
		var checkboxBool = [];
		var checkAll = document.getElementsByName(name + "-all")[0];
		var checkbox = document.getElementsByName(name);
		//三个复选框都被选中时，全选被选中；取消一个时，也同时取消全选；
		if (checkbox[0].checked && checkbox[1].checked && checkbox[2].checked) {
			checkAll.checked = true;
		}else{
			checkAll.checked = false;
		}
	
		//只有一个项目被选中时，无法取消选中；
		for (var i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				checkboxBool.push(checkbox[i]);
			}
		}
		if (checkboxBool.length <= 1) {
			checkboxBool[0].disabled = true;
		}else{
			for (var i = 0; i < checkboxBool.length; i++) {
				checkboxBool[i].disabled = false;
			}
		}
	}	