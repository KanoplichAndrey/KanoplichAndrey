
alert("Добро пожаловать")


function game(){
  return alert('Игра запускается')
}

function name() {
let a=prompt('1. Угодалка \n 2. Считалка \n 3. Кликалка \n Для выхода введите exit' )

//console.log(a)
// (a==1)? fun1():
// (a==2)? fun2():
// (a==3)? fun3():
// (a=='exit') ? fun4():name();
//////////////// как вариант //////////////////
if(a==1||a=='угодалка') {
  fun1()
}
else if(a==2||a=='считалка') {
  fun2()
} 
else if(a==3||a=='кликалка') {
  fun3()
}
else if(a=='exit') {
  fun4()
}
else if(a==null) {
  fun4()
}
else{
  not()
  name()
} 
}
function fun4(){
  alert('досвидание')
}
function not() {
  alert('неправильный ввод\n попробуй еще раз')
}


name()
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// G A M E 1 ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function fun1(){
  game()
  alert('Игра угодалка')
  alert('Я случайным образом загадаю число от 1 до 10. \nтвоя задача угадать за минимальное количество \nпопыток.\n     после каждого твоего ввода я буду говорить болше твое\nчисло или меньше заданного. \n   начнем?')
  let random= Math.floor(Math.random() * 10) + 1

let count=0
for(let result; result !== random;){
  count= count+1
  if(result<random) alert('Слишком мало')
  if(result>random) alert('Слишком много')
  result= +prompt('Подтвердите действие \nПопробуй угадать?')
  }
alert('Угадал')
alert('Тебе удалось отгадать число '+random+' с '+count+"-ой попытки")


name() 
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

    let items = Array('+','-','*')
    let item = items[Math.floor(Math.random()*items.length)];
    //let c=((Math.random() < 0.5) ? -0 : +0)

let sum=prompt(a+' '+item+' '+b)

if(sum==a+b||sum==a-b ||sum==a*b){
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
game()
alert('игра кликалка')
alert(`  я случайным образом буду показывать 10 системных окон.
  твоя задача как можно скорее прокликать все.
  при этом в окне confirm нужно нажимать "отмена".
  начинаем?`)

  let all=0
  let con=0
  let fals=0

  for(let i=1;i<=10;i++){
    let a=Math.floor(Math.random() * 3) + 1
    if(a==1) confir()
    if(a==2) aler()
    if(a==3) confir1()
  }
  function confir1(){
    с= confirm('нажмите "ок" ')
    if(с===true) con++
    if(с!==true) fals++
  }

  function confir(){
    d= confirm('нажмите "отмена" ')
    if(d===true) fals++
    if(d!==true) con++
  }

  function aler(){
    s= alert('просто нажмите "ok"')
  if(s===undefined) all++
  }

alert(`Вы допустили ${fals} ошибок`)
name()
}
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////





















