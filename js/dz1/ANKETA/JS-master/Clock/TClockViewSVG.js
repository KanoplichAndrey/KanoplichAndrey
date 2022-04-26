
"use strict";


function TClockViewSVG (model,name) {
    var self=this;


    var Hour=0;
    var Minutes=0;
    var Seconds=0;
    var Work=1;
    self.SwitchOn=function () {
        Work=1;
    };
    self.SwitchOff=function () {
        Work=0;
    };
    self.ReturnViewInfo=function () {
        return [SvgTag,container,name];
    };

    var ClockRadius=230;
    var ClockBackground="#fcca66";
    var num = 12; // Число часов
    var wrap = 100; // Размер часов для расположения картинок
    var radius = 90; // Радиус нашего круга
    var ColorOfArrows="black";
    var ColorOfHour="#48b382";
    var TextLenHour ="12";
    var RadiusOfHour="30";
    var ArrowsTransformOrigin="7";
    var WidthOfArrow={HourArrow:"10",MinuteArrow:"7",SecondArrow:"3"};
    var HeightOfArrow={HourArrow:"70",MinuteArrow:"90",SecondArrow:"100"};
    var SecondToAngle=6;
    var MinuteToAngle=6;
    var HourToAngle=30;
    var StartAngle=180;
    var ArrowsOpacity="0.8";
    var HourArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var MinuteArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var SecondArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var TextClock=document.createElementNS("http://www.w3.org/2000/svg",'text');
    var SvgTag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    SvgTag.setAttribute('width',ClockRadius);
    SvgTag.setAttribute('height',ClockRadius);


    var container=document.createElement("div");
    container.classList.add('container');
    container.style.width=ClockRadius*1.2+"px";
    container.style.height=ClockRadius*1.2+"px";
    container.appendChild(SvgTag);


    document.querySelector('body').appendChild(container);

    var clock=document.createElementNS("http://www.w3.org/2000/svg",'circle');

    clock.setAttribute( "id", "clock" );
    clock.setAttribute( "cx", ClockRadius/2 );
    clock.setAttribute( "cy", ClockRadius/2 );
    clock.setAttribute( "r", ClockRadius/2 );
    clock.setAttribute( "stroke", ClockBackground );
    clock.setAttribute( "fill", ClockBackground );


    var Arrows=[HourArrow,MinuteArrow,SecondArrow];
    HourArrow.setAttribute("width",WidthOfArrow.HourArrow);
    HourArrow.setAttribute("height",HeightOfArrow.HourArrow);
    MinuteArrow.setAttribute("width",WidthOfArrow.MinuteArrow);
    MinuteArrow.setAttribute("height",HeightOfArrow.MinuteArrow);
    SecondArrow.setAttribute("width",WidthOfArrow.SecondArrow);
    SecondArrow.setAttribute("height",HeightOfArrow.SecondArrow);
    SecondArrow.setAttribute("rx",WidthOfArrow.SecondArrow/2);
    SecondArrow.setAttribute("ry",WidthOfArrow.SecondArrow/2);
    MinuteArrow.setAttribute("rx",WidthOfArrow.MinuteArrow/2);
    MinuteArrow.setAttribute("ry",WidthOfArrow.MinuteArrow/2);
    HourArrow.setAttribute("rx",WidthOfArrow.HourArrow/2);
    HourArrow.setAttribute("ry",WidthOfArrow.HourArrow/2);


    SvgTag.appendChild(clock);
    SvgTag.appendChild(TextClock);



    for (var  i=num;i>0; i--){

        var hour=document.createElementNS("http://www.w3.org/2000/svg",'circle');
        var text=document.createElementNS("http://www.w3.org/2000/svg",'text');


        text.appendChild(document.createTextNode(i));

        var f = 2 / num * i * Math.PI;
        var left = wrap + radius * Math.sin(f) ;
        var top = wrap - radius * Math.cos(f) ;
        hour.style.top=top;
        hour.style.left=left;

        hour.setAttribute( "cx", left + RadiusOfHour/2);
        hour.setAttribute( "cy", top + RadiusOfHour/2 );
        hour.setAttribute( "r", RadiusOfHour/2 );
        hour.setAttribute( "stroke", ColorOfHour );
        hour.setAttribute( "fill", ColorOfHour );
        text.setAttribute("textLength",TextLenHour);
        text.setAttribute("lengthAdjust","spacing");
        if (i>9){ //костыль на варавнивание текста :)

            text.setAttribute("x",left + RadiusOfHour/2-TextLenHour/2-2);
            text.setAttribute("y",top + RadiusOfHour/2 +TextLenHour/2 );
        } else {
            text.setAttribute("x",left + RadiusOfHour/2-TextLenHour/2+1);
            text.setAttribute("y",top + RadiusOfHour/2 +TextLenHour/2 );
        }
        UpdateClock();

        SvgTag.appendChild(hour);
        SvgTag.appendChild(text);

    }

    for (var j=0;j<Arrows.length;j++){
        SvgTag.appendChild(Arrows[j]);
        Arrows[j].setAttribute( "x", ClockRadius/2 - Arrows[j].getBBox().width/2 );
        Arrows[j].setAttribute( "y", ClockRadius/2 -ArrowsTransformOrigin );
        Arrows[j].setAttribute( "fill", ColorOfArrows );
        //Arrows[j].setAttribute( "fill-opacity", ArrowsOpacity );
        Arrows[j].style.transformOrigin="center" +" " + ArrowsTransformOrigin + "%";
    }



    // дополняет строку Val слева нулями до длины Len
    function Str0L(Val,Len)
    {
        var StrVal=Val.toString();
        while ( StrVal.length < Len )
            StrVal='0'+StrVal;
        return StrVal;
    }




    function UpdateClock() {
        if(Work){
            var Time=model.NowTime();
            Hour=Time[0];
            Minutes=Time[1];
            Seconds=Time[2];
        }
        var HAngle=Hour*HourToAngle-StartAngle+(Minutes*0.5); // перемещение часовой стрелки  с + градусы от минут часа
        HourArrow.style.transform="rotate("+HAngle+"deg)";
        var MAngle=Minutes*MinuteToAngle-StartAngle;
        MinuteArrow.style.transform="rotate("+MAngle+"deg)";
        var SAngle=Seconds*SecondToAngle-StartAngle;
        SecondArrow.style.transform="rotate("+SAngle+"deg)";
        var NowTime=Str0L(Hour,2) + ':' + Str0L(Minutes,2) + ':' + Str0L(Seconds,2);
        TextClock.innerHTML=NowTime;
        TextClock.setAttribute('x', ClockRadius/2 -TextClock.getBBox().width/2 );
        TextClock.setAttribute('y',ClockRadius/3);
        requestAnimationFrame(UpdateClock);

    };
    UpdateClock();


}
