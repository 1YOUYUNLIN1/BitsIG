
/*
class bigNum {  
    constructor(basNum, expNum) {  
        this.bas = basNum;
        this.exp = expNum;
    }  
}
//*/
//*
function bigNum(basNum,expNum)  // basNum * 10^expNum
{
    this.bas = basNum;
    this.exp = expNum;
}
//*/
function numToExp(num)   //把数字转成科学计数法(返回object)
{
    if(typeof num == 'number')
    {
        if(num!=0)
        {
            var newExp = Math.floor( Math.log10( num ) );
            var ret = new bigNum( num / Math.pow(10, newExp) , newExp);
            return ret;
        }
        var ret = new bigNum(0,0);
        return ret;
    }
    if(typeof num == 'object')
    {
        return num;
    }
    var ret = new bigNum(0,0);
    return ret;
}
function expToStr(value)    //把科学计数法的数字转为string
{
    if(value.exp >= 1e5)
    {
        return 'e' + ( value.exp > 0 ? '+' : '' ) + expToStr( numToExp(value.exp) );
    }
    if(value.exp < 5)
    {
        return (value.bas * Math.pow(10, value.exp)).toFixed(4 - value.exp);
    }
    return '' + ( (value.bas).toFixed(4) ) + 'e' + ( value.exp > 0 ? '+' : ( value.exp < 0 ? '-' : '' ) ) + value.exp;
}
function expToExp(num)    //把科学计数法的数字转为正规的科学计数法
{
    var value = num;
    if(value.bas)
    {
        value.bas *= Math.pow( 10 , value.exp - Math.floor(value.exp) );
        value.exp = Math.floor(value.exp);
        while( Math.abs(value.bas) < 1)
        {
            value.bas *= 10;
            value.exp--;
        }
        while( Math.abs(value.bas) >= 10)
        {
            value.bas *= 0.1;
            value.exp++;
        }
    }
    else
    {
        value.exp = 0;
    }
    return value;
}
function exppToExp(basNum, expNum)    // 把 [ 底数和指数都是 [ 科学计数法的数字 ] 的数字] 转为正规的科学计数法
{
    var ret = new bigNum( basNum.bas , expNum.bas * Math.pow(10 , expNum) + basNum.exp );
    ret = expToExp(ret);
    return ret;
}
function add(val1, val2)    //加法
{
    if( Math.abs( val1.exp-val2.exp ) >= 308 )  //如果两数差距过大就别算了
    {
        return ( greater( abs(val1) , abs(val2) ) ? new bigNum( val1.bas , val1.exp ) : new bigNum( val2.bas , val2.exp ) );
    }
    var ret = new bigNum( val1.bas + val2.bas * Math.pow( 10, val2.exp - val1.exp ) , val1.exp );
    ret = expToExp(ret);
    return ret;
}
function sub(val1, val2)    //减法
{
    if( Math.abs( val1.exp-val2.exp ) >= 308 )  //如果两数差距过大就别算了
    {
        return ( greater( abs(val1) , abs(val2) ) ? new bigNum( val1.bas , val1.exp ) : new bigNum( -1 * val2.bas , val2.exp ) );
    }
    var ret = new bigNum( val1.bas - val2.bas * Math.pow( 10, val2.exp - val1.exp ) , val1.exp );
    ret = expToExp(ret);
    return ret;
}
function mul(val1, val2)    //乘法
{
    var ret = new bigNum( val1.bas * val2.bas , val1.exp + val2.exp );
    ret = expToExp(ret);
    return ret;
}
function div(val1, val2)    //除法
{
    var ret = new bigNum( val1.bas *1./ val2.bas , val1.exp - val2.exp );
    ret = expToExp(ret);
    return ret;
}
function log10(value)   //以10为底的对数
{
    return numToExp( Math.log10(value.bas) + value.exp );
}
function log2(value)   //以2为底的对数
{
    return numToExp((Math.log10(value.bas) + value.exp) / Math.log10(2));
}
function sqrt(value)   //开根
{
    return expToExp(new bigNum(Math.sqrt(value.bas)*((value.exp%2)?Math.sqrt(10):1),Math.floor(value.exp/2+.1)));
}
function sqr(value)   //平方
{
    return mul(value,value);
}
function fixExp(value)  //修补NaN的情况
{
    if(isNan(value))
    {
        return new bigNum(0,0);
    }
    return value;
}
function expToNum(value)
{
    return value.bas * Math.pow( 10 , value.exp );
}
function pow(val1, val2)
{
    var ret = new bigNum( Math.pow( val1.bas , val2 ) , val1.exp * val2 );
    ret = expToExp(ret);
    return ret;
}
function floor(value)
{
    if(Math.abs(value.exp)>=5)
    {
        return value;
    }
    return numToExp( Math.floor( expToNum( value ) ) );
}
function abs(value)
{
    return new bigNum( Math.abs(value.bas) , value.exp );
}
function equ(val1, val2)    //等于
{
    return ( val1.bas == val2.bas && val1.exp == val2.exp );
}
function less(val1, val2)   //小于
{
	if(val1.bas==0){
		return val2.bas>0;
	}
	if(val2.bas==0){
		return val1.bas<0;
	}
    if(val1.exp != val2.exp)
    {
        return val1.exp < val2.exp;
    }
    return val1.bas < val2.bas;
}
function greater(val1, val2)    //大于
{
	if(val1.bas==0){
		return val2.bas<0;
	}
	if(val2.bas==0){
		return val1.bas>0;
	}
    if(val1.exp != val2.exp)
    {
        return val1.exp > val2.exp;
    }
    return val1.bas > val2.bas;
}
function leq(val1, val2)    //小于等于
{
    return less(val1, val2) || equ(val1, val2);
}
function geq(val1, val2)    //大于等于
{
    return greater(val1, val2) || equ(val1, val2);
}
function isNan(value)   //判断是不是not a number
{
    return isNaN(value.bas) || isNaN(value.exp);
}
function max(val1, val2)    //两数中较大者
{
    return (geq(val1,val2) ? val1 : val2);
}
function min(val1, val2)    //两数中较小者
{
    return (leq(val1,val2) ? val1 : val2);
}function checkType(any) {
	return Object.prototype.toString.call(any).slice(8, -1)
}
function clone(any){
	if(checkType(any) === 'Object') { // 拷贝对象
		let o = {};
		for(let key in any) {
			o[key] = clone(any[key])
		}
		return o;
	} else if(checkType(any) === 'Array') { // 拷贝数组
		var arr = []
		for(let i = 0,leng = any.length;i<leng;i++) {
			arr[i] = clone(any[i])
		}
		return arr;
	} else if(checkType(any) === 'Function') { // 拷贝函数
		return new Function('return '+any.toString()).call(this)
	} else if(checkType(any) === 'Date') { // 拷贝日期
		return new Date(any.valueOf())
	} else if(checkType(any) === 'RegExp') { // 拷贝正则
		return new RegExp(any)
	} else if(checkType(any) === 'Map') { // 拷贝Map 集合
		let m = new Map()
		any.forEach((v,k)=>{
			m.set(k, clone(v))
		})
		return m
	} else if(checkType(any) === 'Set') { // 拷贝Set 集合
		let s = new Set()
		for(let val of any.values()) {
			s.add(clone(val))
		}
		return s
	}
	return any;
}