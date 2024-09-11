window.onload = init;
const gamere={
	showing:'T1',
	msOfTick:50,
    intervalId1:null,
	bits:0,
	sensor:[0,0,0,0,0,0,0,0,0,0,0],
	sensornum:[0,1,1,1,1,1,1,1,1,1,1,1],
	price:[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10],
	pricefactor:[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10],
	pricefactor2:[0,1,1,1,1,1,1,1,1,1,1],
	factor:[0,1,1,1,1,1,1,1,1,1,1],
	upgrade:[false,false,false,false],
	upgprice:[0,1e20,1e40,1e50]
};
var game;
game=clone(gamere);
function init(){
	load();
	showT1();
	printBits();
	gameToExp();
}
function updupg(){
	if(game.upgrade[1]){
		if(game.upgrade[3]){
			for(var i=1;i<=10;i++){
				game.factor[i]=max(sqr(log2(game.bits)),new bigNum(1,0));
			}
		}
		else{
			for(var i=1;i<=10;i++){
				game.factor[i]=max(log10(game.bits),new bigNum(1,0));
			}
		}
	}
	else{
		for(var i=1;i<=10;i++){
			game.factor[i]=new bigNum(1,0);
		}
	}
	if(game.upgrade[2]){
		for(var i=1;i<=10;i++){
			game.pricefactor2[i]=max(new bigNum(0,0),min(div(new bigNum(1,0),log10(game.bits)),new bigNum(1,0)));
		}
	}
	else{
		for(var i=1;i<=10;i++){
			game.pricefactor2[i]=new bigNum(1,0);
		}
	}
}
function tick(){
	updupg();
	for(var i=10;i>1;i--){
		game.sensor[i-1]=add(game.sensor[i-1],mul(mul(mul(game.sensor[i],game.sensornum[i]),game.factor[i]),new bigNum(5,-2)))
	}
	game.bits=add(game.bits,mul(mul(mul(game.sensor[1],game.sensornum[1]),game.factor[1]),new bigNum(5,-2)));
	printBits();
	printSensors();
	printT1upg();
}
function gameToExp(){
    for(var i = 0; i <= 10; i++){
        game.factor[i] = numToExp(game.factor[i]);
        game.price[i] = numToExp(game.price[i]);
        game.pricefactor[i] = numToExp(game.pricefactor[i]);
        game.sensor[i] = numToExp(game.sensor[i]);
        game.sensornum[i] = numToExp(game.sensornum[i]);
        game.upgprice[i] = numToExp(game.upgprice[i]);
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
function save2(data){
	var savestr=window.btoa(JSON.stringify(game));
	var tST = document.getElementById('saveText');
    tST.value = savestr;
}
function load(){
	try{
		reset();
		var savefile,jsonData=localStorage.getItem("game");
		if(jsonData!==null){
			console.log("loaded.");
			savefile=JSON.parse(localStorage.getItem("game"));
		}
		if(savefile.showing!==undefined){
			game.showing=savefile.showing;
		}
		if(savefile.bits!==undefined){
			game.bits=savefile.bits;
		}
		if(savefile.sensor!==undefined){
			for(var i=0;savefile.sensor[i]!==undefined;i++){
				game.sensor[i]=savefile.sensor[i];
			}
		}
		if(savefile.sensornum!==undefined){
			for(var i=0;savefile.sensornum[i]!==undefined;i++){
				game.sensornum[i]=savefile.sensornum[i];
			}
		}
		if(savefile.price!==undefined){
			for(var i=0;savefile.price[i]!==undefined;i++){
				game.price[i]=savefile.price[i];
			}
		}
		if(savefile.pricefactor!==undefined){
			for(var i=0;savefile.pricefactor[i]!==undefined;i++){
				game.pricefactor[i]=savefile.pricefactor[i];
			}
		}
		if(savefile.pricefactor2!==undefined){
			for(var i=0;savefile.pricefactor2[i]!==undefined;i++){
				game.pricefactor2[i]=savefile.pricefactor2[i];
			}
		}
		if(savefile.factor!==undefined){
			for(var i=0;savefile.factor[i]!==undefined;i++){
				game.factor[i]=savefile.factor[i];
			}
		}
		if(savefile.upgrade!==undefined){
			for(var i=0;savefile.upgrade[i]!==undefined;i++){
				game.upgrade[i]=savefile.upgrade[i];
			}
		}
	}
	catch(error){
		console.error("Error:",error);
	}
}
function isBase64(str) {
    if (str ==='' || str.trim() ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}
function isJson(str) {
	try {
		if (typeof JSON.parse(str) == "object") {
			return true;
		}
	}
	catch(error){}
	return false;
}
function load2(){
	var tST=document.getElementById("saveText");
	var savetext=tST.value;
	if(isBase64(savetext)){
		if(isJson(atob(savetext))){
			localStorage.setItem("game",atob(savetext));
			load();
			save();
			var err=document.getElementById("loadStrErr");
			err.innerText="已覆盖存档!";
		}
		else{
			var err=document.getElementById("loadStrErr");
			err.innerText="存档已损坏!";
		}
	}
	else{
		var err=document.getElementById("loadStrErr");
		err.innerText="存档已损坏!";
	}
}
autoSave=setInterval(()=>{
	save(game);
},10000);
window.addEventListener("beforeunload",()=>{
	clearInterval(autoSave)
});
function reset(){
	game=clone(gamere);
	clearInterval(autoSave);
	gameToExp();
	showT1();
}
function hardReset(){
	reset();
	save();
	location.reload();
}