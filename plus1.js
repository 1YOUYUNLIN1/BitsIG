﻿function plus1(){
	game.bits=add(game.bits,new bigNum(1,0));
	printBits();
}
function buy(tier,type,level){
	switch(tier){
		case 1:
			switch(type){
				case 0:
					if(geq(game.bits,price(1,0,level))){
						game.bits=sub(game.bits,price(1,0,level));
						game.upgrade[level]=true;
					}
					break;
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
		case 2:
			switch(type){
				case 0:
					if(geq(game.storages,price(2,0,level))){
						game.storages=sub(game.storages,price(2,0,level));
						game.T2.upgrade[level]=true;
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
				case 0:
					return game.upgprice[level];
				case 1:
					return mul(game.price[level],game.pricefactor2[level]);
			}
			break;
		case 2:
			switch(type){
				case 0:
					return game.T2.upgprice[level];
			}
			break;
	}
}
function allmax(tier){
	switch(tier){
		case 1:
			for(var i=10;i>=1;i--){
				while(geq(game.bits,price(1,1,i))){
					buy(1,1,i);
				}
			}
			break;
	}
}