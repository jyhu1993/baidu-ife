
//菜品类；创建Dishes构造器；
function Dishes(name,cost,price){
	this.name = name;
	this.cost = cost;
	this.price = price;
}
//创建一个菜单；
function createMenu(){
	var menu = [];
	//创建各菜品，并放入菜单；
	menu.push(new Dishes('egg','10','12'),
			  new Dishes('steak','30','40'),
			  new Dishes('fish','20','30'),
			  new Dishes('pork','15','20'),
			  new Dishes('prawn','40','50'));
	return menu;
}

