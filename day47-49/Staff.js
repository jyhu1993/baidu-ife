//职员类；定义Staff构造器；
function Staff(ID,name,salary){
	this.id = ID;
	this.name = name;
	this.salary = salary;
}
//为Staff.prototype定义完成一次工作的方法；
Staff.prototype.finishWork = function(argument){
	var serverWords = document.querySelector('#server-words');
	var customerWords = document.querySelector('#customer-words');
	var workingDish = document.querySelector('#working-dish');
	var dishesList = document.querySelector('#dishes-list');	
	if (!argument.targetDishes) {
	}else{
		var targetDishes = argument.targetDishes;
		var targetDishesName =[];
		for (var i = 0; i < targetDishes.length; i++) {
			targetDishesName.push(targetDishes[i].name);
		}
	}
	if (argument == '点菜') {
		serverWords.innerHTML = '服务员：您好，我是' + this.name + ',您想要吃点什么？';
	}else if(argument.word == '做完了'){
		workingDish.innerHTML = '空闲';
	}else if(argument.word == '做菜'){
		dishesList.innerHTML = targetDishesName.slice(k+1,targetDishesName.length).toString().replace(/,/g,'<br />');
		if (targetDishes[k] == undefined) {
			clearTimeout(t);
			return false;
		}else{
			var remainTime = targetDishes[k].time / 1000;	
			remainTimeChange();
			function remainTimeChange(){
			if (remainTime == 0) {
				remainTime = targetDishes[k].time / 1000;	
			}else{
				workingDish.innerHTML = '正在做:'+targetDishesName[k] + ',还有'+ remainTime + 's完成';
				remainTime = remainTime - 1;	
				t = setTimeout(remainTimeChange,1000);
				}
			}	
			
		};
		
	}else if(argument.word == '点好了'){
		//设置顾客头顶的菜品状态；
		customerWords.innerHTML = '';
		for (var i = 0; i < targetDishesName.length; i++) {
			var dishName = document.createTextNode(targetDishesName[i]);
			customerWords.appendChild(dishName);
			var statueTag = document.createElement('span');
			customerWords.appendChild(statueTag);
			var br = document.createElement('br');
			customerWords.appendChild(br);
			var statueTxt = document.createTextNode(' 未上');
			statueTag.appendChild(statueTxt);
		}
		serverWords.innerHTML = '服务员：好的，请稍等';
	}else if (argument.word == '结账') {
		var totalMoney = 0;
		for (var i = 0; i < targetDishes.length; i++) {
			totalMoney = totalMoney + targetDishes[i].price;
		}
		customerWords.innerHTML = '';
		serverWords.innerHTML = '服务员：一共是' + totalMoney + '元，欢迎下次光临';
		return totalMoney;
	}
};

//为服务员类和厨师类创建单例；
//服务员类；定义Server构造器；
function Server(ID,name,salary){
	//继承自Staff;
	Staff.call(this,ID,name,salary);
}
//继承Staff的全部方法；
Server.prototype = Object.create(Staff.prototype);
Server.prototype.constructor = Server;
//创建服务员单例；
var SingleServer = (function(){
	var instance;
	return function(ID,name,salary){
		if (!instance) {		
			instance = new Server(ID,name,salary);
		}
		return instance;
	};
})();
//创建单一服务员Mary;
var server = SingleServer('001','Mary','2000');




//厨师类；创建Cook构造器；
function Cook(ID,name,salary){
	//继承自Staff;
	Staff.call(this,ID,name,salary);
}
//继承Staff的全部方法；
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
//创建厨师单例；
var SingleCook = (function(){
	var instance;
	return function(ID,name,salary){
		if (!instance) {		
			instance = new Cook(ID,name,salary);
		}
		return instance;
	};
})();
//创建单一厨师Tony；
var cooker = SingleCook('002','Tony','3000');

