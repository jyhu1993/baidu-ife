//顾客类；创建Customer构造器；
function Customer(){
	//只有方法；
}
//为顾客创建入座的方法；
Customer.prototype.sitDown = function(){
	if (ifeRestaurant.customerNum == 0) {
		console.log('有顾客进门');
	}	
};
//为Customer创建点菜的方法；
Customer.prototype.order = function(argument){
	if (argument == '请点菜') {
		//随机点orderDishesNum数量的菜；
		var orderDishedNum = Math.floor(Math.random() * ifeRestaurant.menu.length);
		//创建orderDishesNum个随机数；
		var targetDishes = [];
		var targetDishesName = [];
		for (var i = 0; i <= orderDishedNum; i++) {
			var randomNum;
			randomNum = Math.floor(Math.random() * ifeRestaurant.menu.length);
			//生成的随机数可能有重复，检查targetDishes数组，无该元素才放入；
			if (targetDishesName.indexOf(ifeRestaurant.menu[randomNum].name) == -1) {
				targetDishesName.push(ifeRestaurant.menu[randomNum].name);	
				targetDishes.push(ifeRestaurant.menu[randomNum]);	
			}	
		}
		var customerWords = document.querySelector('#customer-words');
		customerWords.innerHTML = '顾客:您好，我想要' + targetDishesName.toString();
		console.log('顾客:您好，我想要' + targetDishesName.toString());
		return targetDishes;
	}
};
//为Customer创建吃的方法；
Customer.prototype.eat = function(argument){
	if (argument.word == '请用餐') {
		var customerWords = document.querySelector('#customer-words');
		customerWords.innerHTML = '顾客：真好吃;一共多少钱？';
	}
};

//为customer创建状态函数；
Customer.prototype.status = function(argument){
		var statueTag = document.querySelector('#customer-words span');
		var eatTime = '5s';
		statueTag.innerHTML = '正在吃，吃完需' + eatTime;
		function status(){
			if (eatTime == '0s') {
				clearTimeout(t);
				if (statueTag.parentNode == undefined) {
					return false;
				}else{
				statueTag.outerHTML = '已吃完';
				eatTime = '5s';	
				}	
			}
			t = setTimeout(function(){
				eatTime = parseInt(eatTime) -1 + 's';
				statueTag.innerHTML = '正在吃，吃完需' + eatTime;
			status();
			},1000);
		}
		status();

	
};

//创建顾客队列
function createCustomerQueue(){
	var queue = [];
	for (var i = 0; i < 5; i++) {
		queue.push(new Customer());
	}
	return queue;
}
var customerQueue = createCustomerQueue();








