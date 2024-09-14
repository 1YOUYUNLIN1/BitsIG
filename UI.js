function hideAll(){
	var sO = document.getElementById('others');
	sO.hidden = true;
	var bSO = document.getElementById('showO');
	bSO.disabled = false;
	var sT1 = document.getElementById('T1');
	sT1.hidden = true;
	var bST1 = document.getElementById('showT1');
	bST1.disabled = false;
	var sTu1 = document.getElementById('T1upg');
	sTu1.hidden = true;
	var bSTu1 = document.getElementById('showT1upg');
	bSTu1.disabled = false;
	var sT2 = document.getElementById('T2');
	sT2.hidden = true;
	var bST2 = document.getElementById('showT2');
	bST2.disabled = false;
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
	document.getElementById("bits").innerText="你有 "+expToStr(game.bits)+" 位数据";
}
function printSensors(){
	for(var i=1;i<=10;i++){
		document.getElementById("sensor"+i).innerText="数量:"+expToStr(game.sensor[i])+" 价格:"+expToStr(price(1,1,i))+"位 倍率:"+expToStr(mul(game.factor[i],game.sensornum[i]));
		var bBuyS = document.getElementById('bs' + i);
        bBuyS.disabled = ( ( geq( game.bits , price(1,1,i) ) ) ? false : true );
	}
}
function showT1upg(){
	hideAll();
	var sTu1 = document.getElementById('T1upg');
	sTu1.hidden = false;
	var bSTu1 = document.getElementById('showT1upg');
	bSTu1.disabled = true;
	game.showing = 'T1upg';
}
function printT1upg(){
	for(var i=1;i<game.upgrade.length;i++){
		var supg=document.getElementById('supg'+i);
		var bsupg=document.getElementById('bsupg'+i);
		var supgtext=document.getElementById('supgtext'+i);
		supgtext.innerText='价格:'+expToStr(price(1,0,i))+'位 ';
		if(game.upgrade[i]){
			supg.style='color:limegreen';
		}
		else{
			supg.style='color:darkred';
		}
		if(geq(game.bits,price(1,0,i))&&!game.upgrade[i]){
			bsupg.disabled=false;
		}
		else{
			bsupg.disabled=true;
		}
	}
}
function printStorages(){
	document.getElementById("storages").innerText="你有 "+expToStr(game.storages)+" 位存储空间";
	document.getElementById("getStorages").innerText="重置以获得 "+expToStr(calcStorages(game.bits))+" 存储空间";
}
function showT2(){
	hideAll();
	var sTu2 = document.getElementById('T2');
	sTu2.hidden = false;
	var bSTu2 = document.getElementById('showT2');
	bSTu2.disabled = true;
	game.showing = 'T2';
}
function printT2upg(){
	for(var i=1;i<game.T2.upgrade.length;i++){
		var upg=document.getElementById('T2upg'+i);
		var bupg=document.getElementById('bT2upg'+i);
		var upgtext=document.getElementById('T2upgtext'+i);
		upgtext.innerText='价格:'+expToStr(price(2,0,i))+'位存储空间';
		if(game.T2.upgrade[i]){
			upg.style='color:limegreen';
		}
		else{
			upg.style='color:darkred';
		}
		if(geq(game.storages,price(2,0,i))&&!game.T2.upgrade[i]){
			bupg.disabled=false;
		}
		else{
			bupg.disabled=true;
		}
	}
}