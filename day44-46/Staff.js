//职员类；定义Staff构造器；
function Staff(name,salary){
	this.name = name;
	this.salary = salary;
}
//为Staff.prototype定义完成一次工作的方法；
Staff.prototype.finishWork = function(argument){
	if (argument == '点菜') {
		console.log('服务员提供菜单');
	}else if(argument == '上菜'){
		console.log('上菜，请顾客慢用');
	}else if(argument == '做菜'){
		console.log('厨师做菜中，请等待。。。');
	}
};

//为服务员类和厨师类创建单例；
//服务员类；定义Server构造器；
function Server(name,salary){
	//继承自Staff;
	Staff.call(this,name,salary);
}
//继承Staff的全部方法；
Server.prototype = Object.create(Staff.prototype);
Server.prototype.constructor = Server;
//创建服务员单例；
var SingleServer = (function(){
	var instance;
	return function(name,salary){
		if (!instance) {		
			instance = new Server(name,salary);
		}
		return instance;
	};
})();
//创建单一服务员Mary;
var server = SingleServer('Mary','2000');




//厨师类；创建Cook构造器；
function Cook(name,salary){
	//继承自Staff;
	Staff.call(this,name,salary);
}
//继承Staff的全部方法；
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
//创建厨师单例；
var SingleCook = (function(){
	var instance;
	return function(name,salary){
		if (!instance) {		
			instance = new Cook(name,salary);
		}
		return instance;
	};
})();
//创建单一厨师Tony；
var cooker = SingleCook('Tony','3000');

