function calcStorages(bits){
    var storages=log10(mul(div(bits,pow(new bigNum(2,0),256)),new bigNum(1,1)));
    return isNan(storages)?new bigNum(0,0):add(storages,new bigNum(1,0));
}
function getStorages(){
	var s=calcStorages(game.bits);
    if(geq(s,new bigNum(1,0))){
        game.storages=add(game.storages,s);
        T1Reset();
    }
}
function T1Reset(){
	game.bits=0;
	game.sensor=[0,0,0,0,0,0,0,0,0,0,0];
	game.sensornum=[0,1,1,1,1,1,1,1,1,1,1];
	game.price=[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
	game.pricefactor=[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
	game.pricefactor2=[0,1,1,1,1,1,1,1,1,1,1];
	game.factor=[0,1,1,1,1,1,1,1,1,1,1];
	game.upgrade=[false,false,false,false];
	game.upgprice=[0,1e20,1e40,1e50];
    gameToExp();
}