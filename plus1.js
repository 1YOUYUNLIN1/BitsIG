function plus1(){
	game.bits=add(game.bits,new bigNum(1,0));
	printBits();
}
function buy(tier,type,level){
	switch(tier){
		case 1:
			switch(type){
				case 1:
					if(geq(game.bits,price(1,1,level))){
						game.bits=sub(game.bits,price(1,1,level));
						game.sensornum[level]=add(game.sensornum[level],new bigNum(1,0));
						game.sensor[level]=add(game.sensor[level],new bigNum(1,0));
						game.price[level]=mul(game.price[level],game.pricefactor[level]);
					}
					break;
			}
			break;
	}
}
function price(tier,type,level){
	switch(tier){
		case 1:
			switch(type){
				case 1:
					return game.price[level];
			}
			break;
	}
}
function allmax(tier){
	switch(tier){
		case 1:
			for(var i=10;i>=1;i--){
				while(geq(game.bits,game.price[i])){
					buy(1,1,i);
				}
			}
			break;
	}
}