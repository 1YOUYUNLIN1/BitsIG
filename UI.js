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
		document.getElementById("sensor"+i).innerText="数量:"+expToStr(mul(mul(game.sensor[i],game.sensornum[i]),game.factor[i]))+" 价格:"+expToStr(price(1,1,i))+"位 倍率:"+expToStr(mul(game.factor[i],game.sensornum[i]));
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
		if(geq(game.bits,game.upgprice[i])&&!game.upgrade[i]){
			bsupg.disabled=false;
		}
		else{
			bsupg.disabled=true;
		}
	}
}