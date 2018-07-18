//餐厅类；定义Restaurant构造器；
function Restaurant(obj) {
	this.cash = obj.cash;
	this.seats = obj.seats;
	this.staff = obj.staff;
	this.menu = obj.menu;
	this.customerNum = obj.customerNum;
}
//在Restaurant.prototype中加入方法-招聘职员；
Restaurant.prototype.hire = function(newStaff){
	this.staff.push(newStaff);
};
//在Restaurant.prototype中加入方法-解雇职员；
Restaurant.prototype.fire = function(badStaff){
	var staff = this.staff;
	var num = staff.indexOf(badStaff);
	staff = staff.splice(num,1);
};
//在Restaurant.prototype中加入方法-更新菜单；
Restaurant.prototype.updateMenu = function(){
	 var menu = createMenu();
	 this.menu = menu;
};
//创建一个只有一个座位的餐厅对象；
var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1,
    staff: [],
    menu:[],
    customerNum:[]
});


//招聘一个服务员Mary;
ifeRestaurant.hire(server);
//招聘厨师Tony;
ifeRestaurant.hire(cooker);
//更新ife餐厅的菜单；
ifeRestaurant.updateMenu();
console.log(ifeRestaurant);

function serveCustomer(){
	//向顾客服务的流程；
	//顾客入座；
	var customer = customerQueue.shift();
	customer.sitDown();
	//服务员开始点菜；
	server.finishWork('点菜');
	//顾客开始点菜；
	customer.order();
	//厨师开始做菜；
	cooker.finishWork('做菜');
	//服务员上菜；
	server.finishWork('上菜');
	//顾客开始用餐；
	customer.eat();
	if (customerQueue.length == 0) {
		clearInterval(t);
	}
}

var t = setInterval(serveCustomer,2000);



























