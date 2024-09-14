window.onload = init;
const gamere={
	showing:'T1',
	msOfTick:50,
    intervalId1:null,
	bits:0,
	storages:0,
	sensor:[0,0,0,0,0,0,0,0,0,0,0],
	sensornum:[0,1,1,1,1,1,1,1,1,1,1],
	price:[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10],
	pricefactor:[0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10],
	pricefactor2:[0,1,1,1,1,1,1,1,1,1,1],
	factor:[0,1,1,1,1,1,1,1,1,1,1],
	upgrade:[false,false,false,false],
	upgprice:[0,1e20,1e40,1e50],
	T2:{
		upgrade:[false,false],
		upgprice:[0,10]
	}
};
var game;
game=clone(gamere);
function init(){
	load();
	showT1();
	printBits();
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
	//T2
	if(game.T2.upgrade[1]){
		for(var i=1;i<=10;i++){
			game.factor[i]=mul(game.factor[i],sqr(game.storages));
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
	printStorages();
	printT2upg();
}
function gameToExp(){
    // for(var i = 0; i <= 10; i++){
    //     game.factor[i] = numToExp(game.factor[i]);
    //     game.price[i] = numToExp(game.price[i]);
    //     game.pricefactor[i] = numToExp(game.pricefactor[i]);
    //     game.sensor[i] = numToExp(game.sensor[i]);
    //     game.sensornum[i] = numToExp(game.sensornum[i]);
    //     game.upgprice[i] = numToExp(game.upgprice[i]);
    // }
	// game.bits = numToExp(game.bits);
	game=objToExp(game);
	game.msOfTick=50;
	game.intervalId1=setInterval(tick,game.msOfTick);
}
function objToExp(any){
	if(checkType(any) === 'Object'&&any.constructor.name!="bigNum") { // 拷贝对象
		let o = {};
		for(let key in any) {
			o[key] = objToExp(any[key]);
		}
		return o;
	} else if(checkType(any) === 'Array') { // 拷贝数组
		var arr = [];
		for(let i = 0,leng = any.length;i<leng;i++) {
			arr[i] = objToExp(any[i]);
		}
		return arr;
	} else if(checkType(any) === 'Number') { // 拷贝数
		return numToExp(any);
	} else {
		return any;
	}
}
function save(data){
	try{
		localStorage.setItem("game",save2(game));
		console.log("saved.");
	}
	catch(error){
		console.error("Error:",error);
	}
}
function save2(data){
	var savestr=window.btoa(JSON.stringify(game));
	var tST = document.getElementById('saveText');
    return tST.value = savestr;
}
function load(){
	try{
		var savefile;
		var jsonData2=localStorage.getItem("game");
		var jsonData=(isBase64(jsonData2)?(window.atob(jsonData2)):null);
		if(jsonData!==null){
			console.log("loaded.");
			savefile=JSON.parse(jsonData);
		}
		game=clone(gamere);
		gameToExp();
		loading(game,savefile);
	}
	catch(error){
		console.error("Error:",error);
	}
}
function loading(gamere,any){
	if(checkType(any) === 'Object') { // 拷贝对象
		for(let key in any) {
			gamere[key] = loading(gamere[key],any[key])
		}
		return gamere;
	} else if(checkType(any) === 'Array') { // 拷贝数组
		for(let i = 0,leng = any.length;i<leng;i++) {
			gamere[i] = loading(gamere[i],any[i])
		}
		return gamere;
	}
	return any;
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
			localStorage.setItem("game",savetext);
			load();
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