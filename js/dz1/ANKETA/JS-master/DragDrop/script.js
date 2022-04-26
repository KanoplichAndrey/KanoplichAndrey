"use strict"
//document.addEventListener("DOMContentLoaded", start,true);
window.onload=start;
function start() {
    var counter=0;
    var mouseOffset;

        document.querySelectorAll("img").forEach(function (element) {
            var left=getCoords(element).left+"px";
            element.style.left=left;
            element.addEventListener("mousedown",Mouse_Down,false);
            element.addEventListener("mouseup",Mouse_Up,false);
        });
        document.styleSheets[0].insertRule("img { position: absolute; }", 0);


    function Mouse_Down(EO) {
        if (EO.which != 1) {
            return;
        } else { 
            counter++;
            EO=EO||window.event;
            EO.preventDefault();
            var DragElement=EO.target;
            DragElement.style.left= DragElement.offsetLeft + "px";
            DragElement.style.top= DragElement.offsetTop + "px";
            DragElement.style.zIndex=counter;
            DragElement.addEventListener("mousemove",Mouse_Move,false);
            DragElement.style.cursor="pointer";

        }
        mouseOffset = getMouseOffset(DragElement, EO);


    }
    function Mouse_Up(EO) {
        EO=EO||window.event;
        EO.preventDefault();
        var DragElement=EO.target;
        DragElement.removeEventListener("mousemove", Mouse_Move,false)
        document.onmousemove=null; //работает
        DragElement.onmouseout=null;
        DragElement.style.cursor="move";

    }
    function Mouse_Move(EO) {
        EO=EO||window.event;
        EO.preventDefault();
        var DragElement=EO.target;
        DragElement.style.left=EO.pageX - mouseOffset.x +"px";
        DragElement.style.top=EO.pageY -mouseOffset.y+ "px";
        DragElement.onmouseout=function () {
            document.onmousemove=Mouse_Move_Out;
        };

        function Mouse_Move_Out(EO) {
            EO=EO||window.event;
            EO.preventDefault();
            DragElement.style.left=EO.pageX - mouseOffset.x +"px";
            DragElement.style.top=EO.pageY -mouseOffset.y+ "px";
        }

    }
    function getCoords(elem) { // кроме IE8-
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }
    function getMouseOffset(elem, EO) {
        var docPos	= getCoords(elem);
        return {x:EO.pageX - docPos.left, y:EO.pageY - docPos.top};
    }
}


