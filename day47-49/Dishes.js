
//菜品类；创建Dishes构造器；
//菜品的名称，制作成本，售价以及制作时间；
function Dishes(name,cost,price,time){
	this.name = name;
	this.cost = cost;
	this.price = price;
	this.time = time;
}
//创建一个菜单；
function createMenu(){
	var menu = [];
	//创建各菜品，并放入菜单；
	menu.push(new Dishes('红烧茄子',10,12,14*timeUnit),
			  new Dishes('酸菜鱼',30,40,15*timeUnit),
			  new Dishes('农家小炒肉',20,30,16*timeUnit),
			  new Dishes('西红柿鸡蛋汤',15,20,17*timeUnit),
			  new Dishes('糖醋排骨',40,50,18*timeUnit));
	return menu;
}

