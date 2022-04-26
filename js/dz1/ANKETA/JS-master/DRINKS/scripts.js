/**
 * Created by dmitry.sobolevsky on 04.04.2017.
 */
"use strict";
function Rekurs(ob){
    var desc="";

    if (typeof ob == "object") {
        for (var key in ob) {

            if (typeof ob[key] == "object") {//если значение ключа - обьект то вызываем рекурсивную функцию
                self.Rekurs(ob[key]);

            } else {
                desc+= key+': '+ob[key]+'\n';
            }
        }

    } else {
        desc+=ob;
    }

    return desc;

};

function AddName(text) {
    var name='';
    while (name.length===0){
        name=prompt(text);
    }
    return name;
};
function AddInfo (name1,text1,name2,text2) {
    var info = {};
    info[name1] = (confirm(text1)) ? "да" : "нет";
    info[name2] = prompt(text2);
    return info;
}




function CreateButtons(object) {
    var buttons=[{name:"create",text:"ввод информации об элементе"},{name:"show",text:"получение информации о элементе"},{name:"delete",text:"удаление информации о элементе"},{name:"show_all",text:"перечень всех элементов"}];
    var container=document.createElement("div");
    container.classList.add("container");
    var h1Text=document.createTextNode(object.name);
    container.appendChild(h1Text);

    for(var i=0;i<buttons.length;i++){
        var button= document.createElement("button");
        button.id=object.name+'-'+buttons[i].name;
        button.classList.add("myButton");
        button.appendChild(document.createTextNode(buttons[i].text));
        container.appendChild(button);
    }
    document.querySelector('body').appendChild(container);
};


function CreateControllersForDrink (name) {

    document.getElementById('DRINKS-create').onclick = function(){
        name.AddValue(AddName("Введите имя напитка"),AddInfo("Алкогольный","Напиток алкогольный?","Рецепт","Рецепт напитка:"));
    };
    document.getElementById('DRINKS-show').onclick = function(){

        var result=Rekurs(name.GetValue(AddName("Какой напиток показать?")));
        (result=='undefined')?alert("Такой напиток не найден"):alert(result);

    };
    document.getElementById('DRINKS-delete').onclick = function(){
        if(name.DeleteValue(AddName("Какой напиток удалить?"))){
            alert ("Напиток удален");
        }else {
            alert("Такой напиток не найден")
        }
    };
    document.getElementById('DRINKS-show_all').onclick = function(){
        if (name.GetKeys().length!=0){
            alert(name.GetKeys());
        } else {
            alert("Нет элементов");
        }
    };


};


function CreateControllersForFood (name) {

    document.getElementById('FOOD-create').onclick = function(){
        name.AddValue(AddName("Введите имя блюда"),AddInfo("Постное","Блюдо постное?","Рецепт","Рецепт блюда:"));
    };
    document.getElementById('FOOD-show').onclick = function(){

        var result=Rekurs(name.GetValue(AddName("Какое блюдо показать?")));
        (result=='undefined')?alert("Такое блюдо не найдено"):alert(result);

    };
    document.getElementById('FOOD-delete').onclick = function(){
        if(name.DeleteValue(AddName("Какое блюдо удалить?"))){
            alert ("Блюдо удалено");
        }else {
            alert("Нет такого блюда")
        }
    };
    document.getElementById('FOOD-show_all').onclick = function(){
        if (name.GetKeys().length!=0){
            alert(name.GetKeys());
        } else {
            alert("Нет блюд");
        }
    };


};
