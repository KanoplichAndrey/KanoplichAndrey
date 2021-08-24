
alert("Добро пожаловать")

function game(){
  return alert('Игра запускается')
}

function name() {
let a=prompt('1. Угодалка \n 2. Считалка \n 3. Кликалка \n Для выхода введите exit' ).toLowerCase()

//console.log(a)
// (a==1)? fun1():
// (a==2)? fun2():
// (a==3)? fun3():
// (a=='exit') ? fun4():name();
//////////////// как вариант //////////////////
if(a==1) {
  fun1()
}
else if(a==2) {
  fun2()
} 
else if(a==3) {
  fun3()
}
else if(a=='exit') {
  fun4()
}
else if(a==null) {
  fun4()
}
else{
  name()
} 
}
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// G A M E 1 ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function fun1(){
  game()
  alert('Игра угодалка')
  alert('Я случайным образом загадаю число от 1 до 10. \nтвоя задача угадать за минимальное количество \nпопыток.\n     после каждого твоего ввода я буду говорить болше твое\nчисло или меньше заданного. \n   начнем?')
  let random= Math.floor(Math.random() * 10) + 1

let pop=1
for(let result; result !== random;result){
  if(result<random) alert('Слишком мало')
  if(result>random)  alert('Слишком много')
  
  
  result= +prompt('Подтвердите действие \nПопробуй угадать?')

if (result!=random) {
    pop= pop+1
  }
  }
  alert('Угадал')
  alert('Тебе удалось отгадать число '+random+' с '+pop+"-ой попытки")

  name1() 
}

//////////////////////////////////////////////////////////////////////
///////////////////// G A M E 2 //////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function fun2(){
  game()
  alert('Игра считалка')
  alert('Я случайным образом буду давать задания по арифметике.\nТвоя задача правильно решить 5 примеров.\nНачинаем')
  let m=0
  let n=0
  let count=0


    sum()
  
  function sum(){
    let a=Math.floor(Math.random() * 10) + 1
    let b=Math.floor(Math.random() * 10) + 1

    var items = Array('+','-','*')
    var item = items[Math.floor(Math.random()*items.length)];
    //let c=((Math.random() < 0.5) ? -0 : +0)

let sum=prompt(a+' '+item+' '+b)
if(sum==sum==a+b||sum==a-b ||sum==a*b){
  m=m+1
  count=count+1
  if(count==3){
    result()
  } 
else{ 
    sum1()
  }
}
else
{
  n=n+1
  count=count+1
  if(count==3){
    result()
} 
else 
  { 
  sum1()
  }
  } 
  }


function result(){
  alert('вы решили из '+count+' задач '+m+' правильно')
  name()
}

  function sum1(){
    sum()
  }

}





/////////////////////////////////////////////////////////////
////////////////////////// G A M E 3 ////////////////////////
/////////////////////////////////////////////////////////////    
function fun3(){
  document.write('кликалка')
}
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

function fun4(){
  alert('досвидание')
}

function name1(){
    name()
}
name1()



















