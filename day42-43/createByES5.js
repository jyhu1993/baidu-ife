//餐厅类；定义Restaurant构造器；
function Restaurant(obj) {
	this.cash = obj.cash;
	this.seats = obj.seats;
	this.staff = obj.staff;
}
//在Restaurant.prototype中加入方法-招聘职员；
Restaurant.prototype.hire = function(obj){
	this.staff.push(obj.name);
};
//在Restaurant.prototype中加入方法-解雇职员；
Restaurant.prototype.fire = function(obj){
	var staff = this.staff;
	var num = staff.indexOf(obj.name);
	staff = staff.splice(num,1);
};

//职员类；定义Staff构造器；
function Staff(name,salary){
	this.name = name;
	this.salary = salary;
}
//为Staff.prototype定义完成一次工作的方法；
Staff.prototype.finishWork = function finishWork(){

};

//服务员类；定义Server构造器；
function Server(name,salary){
	//继承自Staff;
	Staff.call(this,name,salary);
}
//继承Staff的全部方法；
Server.prototype = Object.create(Staff.prototype);
Server.prototype.constructor = Server;

//厨师类；创建Cook构造器；
function Cook(name,salary){
	//继承自Staff;
	Staff.call(this,name,salary);
}
//继承Staff的全部方法；
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;

//顾客类；创建Customer构造器；
function Customer(){
	//只有方法；
}
//为Customer创建点菜的方法；
Customer.prototype.order = function(){

};
//为Customer创建吃的方法；
Customer.prototype.eat = function(){

};

//菜品类；创建Dishes构造器；
function Dishes(name,cost,price){
	this.name = name;
	this.cost = cost;
	this.price = price;
}
//以下为测试用例；
var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});
var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);
