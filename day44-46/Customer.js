//顾客类；创建Customer构造器；
function Customer(){
	//只有方法；
}
//为顾客创建入座的方法；
Customer.prototype.sitDown = function(){
	if (ifeRestaurant.customerNum == 0) {
		console.log('顾客入座');
	}	
};
//为Customer创建点菜的方法；
Customer.prototype.order = function(){
	//运用随机数，随机点菜；
	var randomNum = Math.floor(Math.random() * ifeRestaurant.menu.length);
	var targetDishes = ifeRestaurant.menu[randomNum];
	console.log('顾客点了' + targetDishes.name);
};
//为Customer创建吃的方法；
Customer.prototype.eat = function(){
	console.log('顾客说：真好吃');

};
//创建顾客队列；
function createCustomerQueue(){
	var queue = [];
	for (var i = 0; i < 20; i++) {
		queue.push(new Customer());
	}
	return queue;
}
var customerQueue = createCustomerQueue();








