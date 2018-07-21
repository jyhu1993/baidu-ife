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
//定义一个该餐厅的时间单位；
var timeUnit = 1000;


//招聘一个服务员Mary;
ifeRestaurant.hire(server);
//招聘厨师Tony;
ifeRestaurant.hire(cooker);
//更新ife餐厅的菜单；
ifeRestaurant.updateMenu();
console.log(ifeRestaurant);


//向顾客服务的流程；
//定义常数k指向第几道菜；
var k = 0;
var customer = customerQueue.shift();
var processStart = new Promise(function(resolve,reject){
		//顾客入座；
		customer.sitDown();
		setTimeout(resolve,1*timeUnit,'点菜');
});	
//服务员为顾客提供点菜服务；
function orderService(argument){
	return new Promise(function(resolve,reject){
		server.finishWork(argument);
		setTimeout(resolve,3*timeUnit,'请点菜');
	});
}

//顾客开始点菜；
function customerOrder(argument){
	return new Promise(function(resolve,reject){
		var targetDishes = customer.order(argument);
		var customerPassMessage = {
			targetDishes:targetDishes,
			word:'点好了'
		};
		setTimeout(resolve,2*timeUnit,customerPassMessage);
	});
}
//服务员通知厨房做菜；
function informCooker(argument){
	return new Promise(function(resolve,reject){
		server.finishWork(argument);
		argument.word = '做菜';
		setTimeout(resolve,2*timeUnit,argument);
	});
}
//厨师开始做菜；
function startCook(argument){	
	return new Promise(function(resolve,reject){
		var targetDishes = argument.targetDishes;
		cooker.finishWork(argument);
		cook();
		function cook(){	
			if (k == targetDishes.length) {
				argument.word = '做完了';
				server.finishWork(argument);
				resolve(argument);
			}else if (k < targetDishes.length) {
				setTimeout(
					function(){						
						argument.finishedDish = targetDishes[k];
						k = k+1;
						cooker.finishWork(argument);
						//完成一道菜时，服务员向顾客送菜；
						if (k == targetDishes.length) {
							//最后一道菜时，服务员去到顾客那儿就不再回来了；
							severToCustomer(argument);
						}else{
							severToCustomer(argument).then(serverToCooker);
						}	
						cook();
					},targetDishes[k].time);	
			}
		}		
	});
}
//服务员上最后一道菜；
function serveDishes(argument){
	return new Promise(function(resolve,reject){
		argument.word = '请用餐';
		k =0;
		//最后一道菜，服务员的移动时间加顾客用餐时间；
		setTimeout(resolve,15*timeUnit,argument);
		
			
	});		
}
//顾客开始用餐；
function customerEat(argument){
	return new Promise(function(resolve,reject){
		customer.eat(argument);
		//服务员1个时间单位是结账时间；
		var settleAccounts = {
			targetDishes:argument.targetDishes,
			word:'结账'
		};
		setTimeout(resolve,2*timeUnit,settleAccounts);
	});
}
//结账；
function pay(argument){	
	//将营业额累计显示到浏览器上；
	return new Promise(function(resolve,reject){	
		var totalMoney = server.finishWork(argument);
		var money = document.querySelector('#money');
		totalMoney = totalMoney + Number(money.innerHTML);
		money.innerHTML = totalMoney;
		setTimeout(resolve,4*timeUnit,'');
		
	});	
}
//检查是否还有在外等候的顾客；
function customerNum(){
	if (customerQueue.length == 0) {
		reject();
	}
}
//正在等候的顾客人数
function waitingCustomer(){
	var waitingNum = document.querySelector('#waiting-number');
	waitingNum.innerHTML = customerQueue.length - 1;
	customerQueue.splice(0,1);	
}

function process(){
	waitingCustomer();
	processStart.then(orderService)
		   .then(customerOrder)
		   .then(informCooker)
		   .then(serverToCooker)
		   .then(startCook)
		   .then(serveDishes)
		   .then(customerEat)
		   .then(pay)
		   .then(customerNum)
		   .then(process)
		   .catch(function(){
		  	 var serverWords = document.querySelector('#server-words');
		  	 serverWords.innerHTML = '今天的顾客都服务完了，下班了';
		   });	       
}
  

window.onload = function(){
	process();
	};   	
	  
	

































