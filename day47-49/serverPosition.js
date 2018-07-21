//设计服务员移动的函数；
function serverToCooker(argument){	
	var serverWords = document.querySelector('#server-words');
	serverWords.innerHTML = '';
	var server = document.querySelector('#server');
	server.style.left = '300px';
    server.style.top = '100px';	
    return new Promise(function(resolve,reject){
    	function animate(){
    		setTimeout(function(){
				var xpos = parseInt(server.style.left);
				var ypos = parseInt(server.style.top);
				
				if (xpos == 970 && ypos == 390) {
					resolve(argument);
				}else{
					if (xpos < 970) {
						xpos = xpos + 2;
					}
					if (ypos < 390) {
						ypos = xpos + 2;
					}
					server.style.left = xpos + 'px';
					server.style.top = ypos + 'px';	
					animate();
			    }
			},10);
	    }
	    animate();	
	});
}

function severToCustomer(argument){
	var server = document.querySelector('#server');
	server.style.left = '970px';
    server.style.top = '390px';	
	return new Promise(function(resolve,reject){
    	function animateToCustomer(){
    		setTimeout(function(){
				var xpos = parseInt(server.style.left);
				var ypos = parseInt(server.style.top);
				if (xpos == 300 && ypos == 100) {
					var serverWords = document.querySelector('#server-words');
					serverWords.innerHTML = '服务员：您好，'+ argument.finishedDish.name+ ' 请慢用';
					customer.status(argument);
					setTimeout(resolve,2*timeUnit,argument);
				}else{
					if (xpos > 300) {
						xpos --;
					}
					if (ypos > 100) {
						ypos --;
					}
					server.style.left = xpos + 'px';
					server.style.top = ypos + 'px';	
					animateToCustomer();
			    }
			},10);
	    }
	    animateToCustomer();
	});
}