/**
 * Created by dmitry.sobolevsky on 23.02.2017.
 */

"use strict";

/* ----------------- валидация формы ---------------------*/

function validation_form(form){//валидация формы

    try {
            var inputs = form.elements;

            var arr = [];
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type != "submit" && inputs[i].type != "checkbox" && inputs[i].type != "select-one") {
                    arr.push(inputs[i]);
                }
            }


            var check = arr.filter(validate_input);
            if (arr.length == check.length) {//сравниваем массив со всеми input  с массивом с input которые прошли проверку
                return true;
            } else {
                return false;
            }


        return true;
    }
    catch ( Ex )
    {
        return false;
    }

}

function validate_input(element){//валидация элемента

    var event=element;
    var checker=true; // проверка на валидность

    if(element.target) {
        element=element.target;
    }

    if(element.type!="radio"){
        if(element.value.length!=0){ //проверка чтобы поле было заполнено
            element.style.border="1px solid #ccc";
            var remove=element.parentNode.parentNode.getElementsByTagName("span");
            if(remove.length>=1){
                element.parentNode.parentNode.removeChild(remove[0]);
            }

            switch (element.type){
                case "text":
                    if(!/[a-zA-Zа-яА-Я']/.test(element.value)&&element.name!='startdate'&&element.name!='persons'){//проверка на буквы
                        element.scrollIntoView();
                        element.style.border="1px solid red";
                        if(event.type!="blur"){
                            element.focus();
                        }
                        show_error("Поле должно содержать буквы");

                    }

                    break;
                case "email":
                    if(!/.+@.+\..+/i.test(element.value)) { //проверка на email ('@','.')
                        element.scrollIntoView();
                        element.style.border="1px solid red";
                        if(event.type!="blur"){
                            element.focus();
                        }
                        show_error("Укажите email");
                    }
                    break;
            }
        }
        else {
            element.scrollIntoView();
            element.style.border="1px solid red";
            if(event.type!="blur"){
                element.focus();
            }
            show_error("Заполните поле");


        }
    } else {// если радио

        if(!check_radio()){
            element.scrollIntoView();
            show_error("Выберите");
        }else {
            var remove=element.parentNode.parentNode.getElementsByTagName("span");
            if(remove.length>=1){
                element.parentNode.parentNode.removeChild(remove[0]);
            }
        }

    }

    function show_error(message) {//вывод ошибки

        if(element.parentNode.parentNode.getElementsByTagName("span").length<1){
            var NewSpanElement=document.createElement("span");
            var NewTextElement=document.createTextNode(message);
            NewSpanElement.style.color="red";
            NewSpanElement.style.marginLeft="1em";
            NewSpanElement.appendChild(NewTextElement);
            element.parentNode.parentNode.appendChild(NewSpanElement);
        }
        checker=false; // если ошибка то checker=false
    }

    if(checker){
        return true;
    } else {
        return false;
    }
}
function check_radio() { //проверка на заполниность radio
    var mass= document.querySelectorAll("[type=radio]");
    var flag=false;

    for(var i=0;i<mass.length;i++){
        if(mass[i].checked){
            flag=true;
        }
    }

    if(flag){
        return true;
    } else {
        return false;
    }

}

function submit_form(EO) {// отправка формы
    EO=EO||window.event;
    var form=EO.target.parentNode.parentNode;
    EO.preventDefault();
    if(validation_form(form)){
        form.submit();
    }

}

for (var i=0;i<form1.elements.length;i++){//вешаем обработчики
    if(form1.elements[i].type=="radio"){
        form1.elements[i].onclick=validate_input;
    } else {
        form1.elements[i].onblur=validate_input;
    }
}
var SubmitButton=form1.querySelector("[type=submit]");
SubmitButton.addEventListener('click',submit_form,false);
