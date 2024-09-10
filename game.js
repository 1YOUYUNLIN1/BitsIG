window.onload = init;
game={
	showing:'T1',
	msOfTick:50,
    intervalId1:null,
	bits:0,
	sensor:[0,0,0,0,0,0,0,0,0,0,0],
	sensornum:[0,1,1,1,1,1,1,1,1,1,1,1],
	price:[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10],
	pricefactor:[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10],
	factor:[0,1,1,1,1,1,1,1,1,1,1]
};
function init(){
	load();
	showT1();
	printBits();
	gameToExp();
}
function tick(){
	for(var i=10;i>1;i--){
		game.sensor[i-1]=add(game.sensor[i-1],mul(mul(mul(game.sensor[i],game.sensornum[i]),game.factor[i]),new bigNum(5,-2)))
	}
	game.bits=add(game.bits,mul(mul(mul(game.sensor[1],game.sensornum[1]),game.factor[1]),new bigNum(5,-2)));
	printBits();
	printSensors();
}
function gameToExp(){
    for(var i = 0; i <= 10; i++){
        game.factor[i] = numToExp(game.factor[i]);
        game.price[i] = numToExp(game.price[i]);
        game.pricefactor[i] = numToExp(game.pricefactor[i]);
        game.sensor[i] = numToExp(game.sensor[i]);
        game.sensornum[i] = numToExp(game.sensornum[i]);
    }
	game.bits = numToExp(game.bits);
	game.intervalId1=setInterval(tick,50);
}
function save(data){
	try{
		localStorage.setItem("game",JSON.stringify(game));
		console.log("saved.");
	}
	catch(error){
		console.error("Error:",error);
	}
}
function load(){
	try{
		var savefile,jsonData=localStorage.getItem("game");
		if(jsonData!==null){
			console.log("loaded.");
			savefile=JSON.parse(localStorage.getItem("game"));
		}
		game.showing=savefile.showing;
		game.bits=savefile.bits;
		game.sensor=savefile.sensor;
		game.sensornum=savefile.sensornum;
		game.price=savefile.price;
		game.pricefactor=savefile.pricefactor;
		game.factor=savefile.factor;
	}
	catch(error){
		console.error("Error:",error);
	}
}
autoSave=setInterval(()=>{
	save(game);
},10000);
window.addEventListener("beforeunload",()=>{
	clearInterval(autoSave)
});
function reset(){
	autosave=null;
	game={
		showing:'T1',
		msOfTick:50,
		intervalId1:null,
		bits:0,
		sensor:[0,0,0,0,0,0,0,0,0,0,0],
		sensornum:[0,1,1,1,1,1,1,1,1,1,1,1],
		price:[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10],
		pricefactor:[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10],
		factor:[0,1,1,1,1,1,1,1,1,1,1]
	};
	gameToExp();
}
function hardReset(){
	reset();
	save();
}