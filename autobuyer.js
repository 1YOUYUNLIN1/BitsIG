function hideAll(){
	var sO = document.getElementById('others');
	sO.hidden = true;
	var bSO = document.getElementById('showO');
	bSO.disabled = false;
	var sT1 = document.getElementById('T1');
	sT1.hidden = true;
	var bST1 = document.getElementById('showT1');
	bST1.disabled = false;
}
function showO(){
	hideAll();
	var sO = document.getElementById('others');
	sO.hidden = false;
	var bSO = document.getElementById('showO');
	bSO.disabled = true;
	game.showing = 'Others';
}
function showT1(){
	hideAll();
	var sT1 = document.getElementById('T1');
	sT1.hidden = false;
	var bST1 = document.getElementById('showT1');
	bST1.disabled = true;
	game.showing = 'T1';
}
function printBits(){
	document.getElementById("bits").innerText="你有 "+expToStr(game.bits)+" 位";
}
function printSensors(){
	for(var i=1;i<=10;i++){
		document.getElementById("sensor"+i).innerText="数量:"+expToStr(mul(mul(game.sensor[i],game.sensornum[i]),game.factor[i]))+" 价格:"+expToStr(game.price[i])+"位 倍率:"+expToStr(mul(game.factor[i],game.sensornum[i]));
	}
}