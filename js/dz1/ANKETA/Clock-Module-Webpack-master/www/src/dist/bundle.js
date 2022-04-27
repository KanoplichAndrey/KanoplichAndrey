!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class s{constructor(t){this.timezone=t,this.changeListener=null,this.hours=new Date(Date.now()+36e5*(this.timezone-3)).getHours(),this.mimutes=new Date(Date.now()+36e5*(this.timezone-3)).getMinutes(),this.seconds=new Date(Date.now()+36e5*(this.timezone-3)).getSeconds(),setInterval(()=>{this.hours=new Date(Date.now()+36e5*(this.timezone-3)).getHours(),this.mimutes=new Date(Date.now()+36e5*(this.timezone-3)).getMinutes(),this.seconds=new Date(Date.now()+36e5*(this.timezone-3)).getSeconds(),"function"==typeof this.changeListenerCallback&&this.changeListenerCallback()},1e3)}setChangeListener(t){this.changeListenerCallback=t}}class n{constructor(t){this.root=t,this.wrapper=null,this.start=null,this.stop=null,this.checkedChangeHandler=null,this.watchFace=null,this.coord=null,this.digit=[],this.digitContent=[],this.center=null,this.clockHand=[],this.digitalClock=null,this.degreeHour=null,this.degreeMin=null,this.degreeSec=null,this.zone=null,this.hour=null,this.mimutes=null,this.seconds=null}render(t){if(!this.wrapper){this.wrapper=document.createElement("div"),this.wrapper.className="wrapper",this.start=document.createElement("input"),this.start.type="button",this.start.value="старт",this.stop=document.createElement("input"),this.stop.type="button",this.stop.value="стоп",this.zone=document.createElement("span"),this.start.addEventListener("click",t=>this.checkedChangeHandler(t.target.value)),this.stop.addEventListener("click",t=>this.checkedChangeHandler(t.target.value)),this.watchFace=document.createElement("div"),this.watchFace.style.cssText="width: 300px; height: 300px; background: #fcca66; border-radius: 50%; position: relative;",this.wrapper.appendChild(this.stop),this.wrapper.appendChild(this.start),this.wrapper.appendChild(this.zone),this.wrapper.appendChild(this.watchFace),this.root.appendChild(this.wrapper),this.coord=this.watchFace.getBoundingClientRect();for(let t=12;t>=1;t--)this.digit[t]=document.createElement("div"),this.watchFace.appendChild(this.digit[t]),this.digitContent[t]=document.createElement("div"),this.digitContent[t].textContent=t,this.digit[t].style.cssText="width: 40px; height: 40px; background: #48b382; border-radius: 50%; position: absolute;",this.digit[t].style.left=this.coord.width/2+(this.coord.width/2-30)*Math.sin(Math.PI/6*t)-this.digit[t].clientWidth/2+"px",this.digit[t].style.top=this.coord.width/2-(this.coord.width/2-30)*Math.cos(Math.PI/6*t)-this.digit[t].clientWidth/2+"px",this.digit[t].appendChild(this.digitContent[t]),this.digitContent[t].style.cssText="position: absolute;",this.digitContent[t].style.left=this.digit[t].clientWidth/2-this.digitContent[t].clientWidth/2+"px",this.digitContent[t].style.top=this.digit[t].clientWidth/2-this.digitContent[t].clientHeight/2+"px";this.digitalClock=document.createElement("div"),this.watchFace.appendChild(this.digitalClock),this.digitalClock.style.cssText="position: absolute; font-size: 2em;",this.digitalClock.textContent="00:00:00",this.digitalClock.style.left=this.coord.width/2-this.digitalClock.clientWidth/2+"px",this.digitalClock.style.top=this.coord.height/2-2*this.digitalClock.clientHeight+"px",this.center=document.createElement("div"),this.watchFace.appendChild(this.center),this.center.style.position="absolute",this.center.style.left=this.coord.width/2+"px",this.center.style.top=this.coord.width/2+"px";for(var e=1;e<=3;e++)this.clockHand[e]=document.createElement("div"),this.center.appendChild(this.clockHand[e]),this.clockHand[e].className="clockHands",this.clockHand[e].style.cssText="position: absolute; background: black; border-radius: 5px; opacity: 0.7;",this.clockHand[e].style.width=2*e+"px",this.clockHand[e].style.height=140-20*e+"px",this.clockHand[e].style.left=-this.clockHand[e].clientWidth/2+"px",this.clockHand[e].style.top=-this.clockHand[e].clientWidth/2+"px",this.clockHand[e].style.transformOrigin=`${e}px ${e}px`}this.zone.textContent=` GMT ${t.timezone}`,this.hour=t.hours,this.hour<10&&(this.hour="0"+t.hours),this.mimutes=t.mimutes,this.mimutes<10&&(this.mimutes="0"+t.mimutes),this.seconds=t.seconds,this.seconds<10&&(this.seconds="0"+t.seconds),this.digitalClock.textContent=`${this.hour}:${this.mimutes}:${this.seconds}`,this.degreeHour=30*(t.hours+1/60*t.mimutes),this.degreeMin=6*(t.mimutes+1/60*t.seconds),this.degreeSec=6*t.seconds,this.clockHand[3].style.transform=`rotate(${this.degreeHour-180}deg)`,this.clockHand[2].style.transform=`rotate(${this.degreeMin-180}deg)`,this.clockHand[1].style.transform=`rotate(${this.degreeSec-180}deg)`}setChangeHandler(t){this.checkedChangeHandler=t}}class h{constructor(t,e){this.model=t,this.view=e,this.view.setChangeHandler(t=>{if("старт"==t)this.registerModelHandler();else{if("стоп"!=t)return;this.model.setChangeListener(null)}}),this.registerModelHandler()}registerModelHandler(){this.model.setChangeListener(()=>this.handleModelChange()),this.handleModelChange()}handleModelChange(){this.view.render(this.model)}}new h(new s(0),new n(document.body)),new h(new s(-5),new n(document.body)),new h(new s(1),new n(document.body)),new h(new s(3),new n(document.body)),new h(new s(9),new n(document.body)),new h(new s(10),new n(document.body))}]);