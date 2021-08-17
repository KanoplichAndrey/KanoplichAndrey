let fam=prompt("введите фамилию")
let name=prompt("введите имя")
let otc=prompt("введите отчество")
let old=+prompt("сколько вам лет")
let god=365
let day=old*365
let day5=old+5
let pol=confirm("ваш пол мужской","или женский")
//let pol1
if(pol==true){
   pol="мужской"
}
else{
   pol = "женский"
}
let pensia=prompt('вы на пенсии?','да или нет')
if (pensia=='да'){
   pensia="да"
}
else if(pensia=="нет"){
   pensia="нет"
}
else {
pensia="вы не правильно ответили на ответ"
}
let fio=fam+" "+name+" "+otc




alert("ваше ФИО: "+fio+ "\n" +"ваш возраст в годах: "+old+"\n"+"ваш возраст в днях: "+day+"\n"+"через 5 лет вам будет: "+day5+"\n"+"ваш пол: "+pol+"\n"+"вы на пенсии: "+pensia)