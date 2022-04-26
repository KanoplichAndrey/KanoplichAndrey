/**
 * Created by dmitry.sobolevsky on 14.03.2017.
 */
"use strict"
var AreaH=
{
    Width : 400,
    Height : 300,
    Background:"#f0ee7e",
    TeamLeft :0,
    TeamRight :0,
    goal: false,
    start:false,
    DirectionX:1,
    DirectionY:1,
    BlockLeft:{
        PosX : 0,
        PosY : 0,
        SpeedY : 0,
        AccelY : 1,
        Width : 15,
        Height: 100,
        color: "#09aa57"
    },
    BlockRight:{
        PosX : 0,
        PosY : 0,
        SpeedY : 0,
        AccelY : 1,
        Width : 15,
        Height: 100,
        color: "#191497"
    }

};
var BallH=
{
    PosX : 0,
    PosY : 10,
    SpeedX : 1,
    SpeedY : 1,
    AccelX : 0,
    AccelY : 0.5,
    Width : 50,
    Height: 50,
    color: "#f02137",


    Create : function () {


        AreaH.BlockLeft.PosX=0;
        AreaH.BlockLeft.PosY=AreaH.Height/2-AreaH.BlockLeft.Height/2;

        AreaH.BlockRight.PosX=AreaH.Width-AreaH.BlockRight.Width;
        AreaH.BlockRight.PosY=AreaH.Height/2-AreaH.BlockRight.Height/2;

        BallH.PosX=AreaH.Width/2-BallH.Width/2;
        BallH.PosY=AreaH.Height/2-BallH.Height/2;

        var BackgrounArea=document.createElement('canvas');
        BackgrounArea.setAttribute("width",AreaH.Width);
        BackgrounArea.setAttribute("height",AreaH.Height);
        var Context = BackgrounArea.getContext('2d');
        Context.fillStyle=AreaH.Background;
        Context.fillRect(0,0,AreaH.Width,AreaH.Height);

        var Area=document.createElement('canvas');
        Area.setAttribute("width",AreaH.Width);
        Area.setAttribute("height",AreaH.Height-1);
        Area.id='move';


        document.querySelector("body").appendChild(BackgrounArea);
        document.querySelector("body").appendChild(Area);

        document.addEventListener("keydown",InputKey,false);
        document.addEventListener("keydown",InputKey2,false);
        document.addEventListener("keyup",InputKeyFalse,false);
        document.addEventListener("keyup",InputKey2False,false);


        function InputKey(EO) //left
        {
            EO=EO||window.event;
            var PressedChar=EO.keyCode;
            switch (PressedChar){
                case 16:
                    EO.preventDefault();
                        AreaH.BlockLeft.SpeedY=-AreaH.BlockLeft.AccelY;
                    break;

                case 17:
                    EO.preventDefault();
                        AreaH.BlockLeft.SpeedY=AreaH.BlockLeft.AccelY;
                    break;
            }
        }

        function InputKeyFalse(EO) {
            EO=EO||window.event;
            var PressedChar=EO.keyCode;
            if  (PressedChar==16 || PressedChar==17){
                AreaH.BlockLeft.SpeedY=0;

            }
        }
        function InputKey2False(EO) {
            EO=EO||window.event;
            var PressedChar=EO.keyCode;
            if  (PressedChar==38 || PressedChar==40){
                AreaH.BlockRight.SpeedY=0;

            }
        }
        function InputKey2(EO) //right
        {
            EO=EO||window.event;
            var PressedChar=EO.keyCode;
            switch (PressedChar){
                case 38:
                    EO.preventDefault();
                        AreaH.BlockRight.SpeedY=-AreaH.BlockRight.AccelY;
                    break;

                case 40:
                    EO.preventDefault();
                        AreaH.BlockRight.SpeedY=AreaH.BlockRight.AccelY;
                    break;
            }
        }


    },

    Update : function() {
        var canvas = document.querySelectorAll('canvas')[1];
        var Context = canvas.getContext('2d');
        Context.clearRect(0, 0, AreaH.Width, AreaH.Height);

        Context.fillStyle='black';
        Context.font='bold 28px Arial';
        var Text=AreaH.TeamLeft+':'+ AreaH.TeamRight;
        var TextLen=Context.measureText(Text).width;
        Context.fillText(Text,AreaH.Width/2-TextLen/2,30);

        var Round=Context;
        Round.beginPath();
        Round.arc(BallH.PosX+BallH.Width/2,BallH.PosY+BallH.Height/2,BallH.Width/2,0,2*Math.PI);
        Round.fillStyle=BallH.color;
        Round.fill();


        var LeftBlock=Context;
        LeftBlock.fillStyle=AreaH.BlockLeft.color;
        LeftBlock.fillRect( AreaH.BlockLeft.PosX, AreaH.BlockLeft.PosY,AreaH.BlockLeft.Width,AreaH.BlockLeft.Height);

        var RightBlock=Context;
        RightBlock.fillStyle=AreaH.BlockRight.color;
        RightBlock.fillRect(AreaH.BlockRight.PosX,AreaH.BlockRight.PosY,AreaH.BlockRight.Width,AreaH.BlockRight.Height);


    }
};



function Start()
{

    AreaH.DirectionX=getRandomInt(0,1);
    AreaH.DirectionY=getRandomInt(0,1);

    if (AreaH.goal){
        AreaH.goal=false;
        BallH.PosY=AreaH.Height/2-BallH.Height/2;
        BallH.PosX=AreaH.Width/2-BallH.Width/2;
        BallH.Update();
        Tick();
    }

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    AreaH.start=true;
}

function Tick()
{
    if (!AreaH.goal) {

        if(AreaH.start){
            BallH.SpeedX += BallH.AccelX;
            if (AreaH.DirectionX){
                BallH.PosX += BallH.SpeedX;
            } else {
                BallH.PosX -= BallH.SpeedX;
            }

            if (AreaH.DirectionY) {
                BallH.PosY += BallH.SpeedY;
            } else {
                BallH.PosY -= BallH.SpeedY;
            }
        }
        if ((AreaH.Height-AreaH.Height)>AreaH.BlockLeft.PosY || AreaH.Height/2+AreaH.BlockLeft.Height/2<AreaH.BlockLeft.PosY ){
            AreaH.BlockLeft.SpeedY=0;

            if(AreaH.BlockLeft.PosY<0) {
                AreaH.BlockLeft.PosY=0;
            }
            if((AreaH.BlockLeft.PosY+AreaH.Height)>AreaH.Height)
            {
                AreaH.BlockLeft.PosY=AreaH.Height-AreaH.BlockLeft.Height;
            }

        }
        if (AreaH.Height/2+AreaH.BlockRight.Height/2<AreaH.BlockRight.PosY || (AreaH.Height-AreaH.Height)>AreaH.BlockRight.PosY) {
            AreaH.BlockRight.SpeedY=0;
            if(AreaH.BlockRight.PosY<0) {
                AreaH.BlockRight.PosY=0;
            }
            if((AreaH.BlockRight.PosY+AreaH.Height)>AreaH.Height)
            {
                AreaH.BlockRight.PosY=AreaH.Height-AreaH.BlockRight.Height;
            }
        }
        
        AreaH.BlockLeft.PosY+=AreaH.BlockLeft.SpeedY;
        AreaH.BlockRight.PosY += AreaH.BlockRight.SpeedY;

        // вылетел ли мяч правее стены?
        if (BallH.PosX + BallH.Width > AreaH.Width) {
            //BallH.SpeedX=-BallH.SpeedX;
            BallH.PosX = AreaH.Width - BallH.Width;
            AreaH.TeamLeft++;
            AreaH.goal=true;
        }

        // вылетел ли мяч левее стены?
        if (BallH.PosX < 0) {
            //BallH.SpeedX=-BallH.SpeedX;
            BallH.PosX = 0;
            AreaH.TeamRight++;
            AreaH.goal=true;
        }
        
        // вылетел ли мяч ниже пола?
        if (BallH.PosY + BallH.Height > AreaH.Height) {
            BallH.SpeedY = -BallH.SpeedY;
            BallH.PosY = AreaH.Height - BallH.Height;
        }
        // вылетел ли мяч выше  потолка?
        if (BallH.PosY  < 0) {
            BallH.PosY = 0;
            BallH.SpeedY = -BallH.SpeedY;
        }

        
        BallH.Update();

        var BallRight = BallH.PosX + BallH.Width;

        //left block
        if (BallH.PosX < (AreaH.BlockLeft.PosX + AreaH.BlockLeft.Width) && BallH.PosY > AreaH.BlockLeft.PosY && BallH.PosY < (AreaH.BlockLeft.PosY + AreaH.BlockLeft.Height) || BallH.PosX < (AreaH.BlockLeft.PosX + AreaH.BlockLeft.Width)&& (BallH.PosY+BallH.Height)>AreaH.BlockLeft.PosY && BallH.PosY<AreaH.BlockLeft.PosY) {
            BallH.SpeedX = -BallH.SpeedX;
            BallH.PosX = AreaH.BlockLeft.Width;
        }

        //right block
        if (BallRight > AreaH.BlockRight.PosX && BallH.PosY > AreaH.BlockRight.PosY && BallH.PosY < (AreaH.BlockRight.PosY + AreaH.BlockRight.Height ) || BallRight > AreaH.BlockRight.PosX && (BallH.PosY+BallH.Height)>AreaH.BlockRight.PosY && BallH.PosY<AreaH.BlockRight.PosY ) {
            BallH.SpeedX = -BallH.SpeedX;
            BallH.PosX = AreaH.Width - AreaH.BlockRight.Width - BallH.Width;
        }
        
        requestAnimationFrame(Tick);
    } else {

        AreaH.BlockLeft.SpeedY=0;
        AreaH.BlockRight.SpeedY=0;
        alert("Goaal!");
        if(confirm("Are you ready?")){
            Start();
        }
    }
}

BallH.Create();
Tick();
