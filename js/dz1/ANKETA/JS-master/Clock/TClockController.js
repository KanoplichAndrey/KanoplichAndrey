
function TClockController(obj) {

    var Info=obj.ReturnViewInfo();
    var ButtonStart= document.createElement("button");
    var ButtonStop= document.createElement("button");
    var NameOfContainer=document.createElement("span");
    NameOfContainer.appendChild(document.createTextNode(Info[2]));
    ButtonStart.style.margin="0 5px 10px 5px";
    ButtonStop.style.margin="0 5px 10px 5px";
    ButtonStart.appendChild(document.createTextNode("старт"));
    ButtonStop.appendChild(document.createTextNode("стоп"));
    ButtonStart.addEventListener('click',obj.SwitchOn,false);
    ButtonStop.addEventListener('click',obj.SwitchOff,false);

    Info[1].insertBefore(ButtonStart,Info[0]);
    Info[1].insertBefore(ButtonStop,Info[0]);
    Info[1].insertBefore(NameOfContainer,Info[0]);


}