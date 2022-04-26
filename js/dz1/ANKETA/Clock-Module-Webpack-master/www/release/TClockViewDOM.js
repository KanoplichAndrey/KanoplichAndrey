export class View {
    constructor(root) {
        this.root = root;
        this.wrapper = null;                       
        this.start = null;
        this.stop = null;
        this.checkedChangeHandler = null;
        this.watchFace = null;
        this.coord = null;
        this.digit = [];
        this.digitContent = [];
        this.center = null;
        this.clockHand = [];
        this.digitalClock = null;
        this.degreeHour = null;
        this.degreeMin = null;
        this.degreeSec = null; 
        this.zone = null; 
        this.hour = null;
        this.mimutes = null;
        this.seconds = null;     
    }

    render(model) {
        // представление создает dom элементы в первый раз
        if (!this.wrapper) {
            this.wrapper = document.createElement('div');
            this.wrapper.className = 'wrapper';                           
            this.start = document.createElement('input');
            this.start.type = 'button';
            this.start.value = 'старт';
            this.stop = document.createElement('input');
            this.stop.type = 'button';
            this.stop.value = 'стоп';
            this.zone = document.createElement('span');
            this.start.addEventListener('click', e => this.checkedChangeHandler(e.target.value));
            this.stop.addEventListener('click', e => this.checkedChangeHandler(e.target.value));            
            this.watchFace = document.createElement('div');
            this.watchFace.style.cssText = 'width: 300px; height: 300px; background: #fcca66; border-radius: 50%; position: relative;';            
            this.wrapper.appendChild(this.stop);
            this.wrapper.appendChild(this.start);
            this.wrapper.appendChild(this.zone);
            this.wrapper.appendChild(this.watchFace);
            this.root.appendChild(this.wrapper);
            this.coord = this.watchFace.getBoundingClientRect();
            for (let i = 12; i >= 1; i--) {
                this.digit[i] = document.createElement('div'); 
                this.watchFace.appendChild(this.digit[i]);
                this.digitContent[i] = document.createElement('div');
                this.digitContent[i].textContent = i;                
                this.digit[i].style.cssText = 'width: 40px; height: 40px; background: #48b382; border-radius: 50%; position: absolute;';          
                this.digit[i].style.left = this.coord.width/2 + (this.coord.width/2 - 30) * Math.sin(Math.PI / 6 * i) - this.digit[i].clientWidth/2 + 'px'; 
                this.digit[i].style.top = this.coord.width/2 - (this.coord.width/2 - 30) * Math.cos(Math.PI / 6 * i) - this.digit[i].clientWidth/2 + 'px'; 
                this.digit[i].appendChild(this.digitContent[i]);
                this.digitContent[i].style.cssText = 'position: absolute;';
                this.digitContent[i].style.left = this.digit[i].clientWidth/2 - this.digitContent[i].clientWidth/2 + 'px';
                this.digitContent[i].style.top = this.digit[i].clientWidth/2 - this.digitContent[i].clientHeight/2 + 'px';                          
            } 
            this.digitalClock = document.createElement('div');
            this.watchFace.appendChild(this.digitalClock);
            this.digitalClock.style.cssText = 'position: absolute; font-size: 2em;';
            this.digitalClock.textContent = `00:00:00`;
            this.digitalClock.style.left = this.coord.width/2 - this.digitalClock.clientWidth/2 + 'px';
            this.digitalClock.style.top = this.coord.height/2 - this.digitalClock.clientHeight*2 + 'px';

            this.center = document.createElement('div');
            this.watchFace.appendChild(this.center);
            this.center.style.position = 'absolute';            
            this.center.style.left = this.coord.width/2 + 'px';
            this.center.style.top = this.coord.width/2 + 'px';

            for (var i = 1; i <= 3; i++) {
                this.clockHand[i] = document.createElement('div');              
                this.center.appendChild(this.clockHand[i]); 
                this.clockHand[i].className = 'clockHands';             
                this.clockHand[i].style.cssText = 'position: absolute; background: black; border-radius: 5px; opacity: 0.7;';                
                this.clockHand[i].style.width = 2 * i + 'px';
                this.clockHand[i].style.height = 140 - 20 * i  + 'px';
                this.clockHand[i].style.left = -this.clockHand[i].clientWidth/2 + 'px';
                this.clockHand[i].style.top = -this.clockHand[i].clientWidth/2 + 'px';
                this.clockHand[i].style.transformOrigin = `${i}px ${i}px`;                
            } 
            
            
        }
            // и обновляет время по данным из модели
        this.zone.textContent = ` GMT ${model.timezone}`;
        this.hour = model.hours;
        if (this.hour < 10) this.hour = '0' + model.hours;
        this.mimutes = model.mimutes;
        if (this.mimutes < 10) this.mimutes = '0' + model.mimutes;
        this.seconds = model.seconds;
        if (this.seconds < 10) this.seconds = '0' + model.seconds;
        this.digitalClock.textContent = `${this.hour}:${this.mimutes}:${this.seconds}`;
        this.degreeHour = 30*(model.hours + (1/60)*model.mimutes);
        this.degreeMin = 6*(model.mimutes + (1/60)*model.seconds);
        this.degreeSec = 6*model.seconds;        
        this.clockHand[3].style.transform = `rotate(${this.degreeHour - 180}deg)`;
        this.clockHand[2].style.transform = `rotate(${this.degreeMin - 180}deg)`;
        this.clockHand[1].style.transform = `rotate(${this.degreeSec - 180}deg)`;        
    }

    setChangeHandler(handler) {
        this.checkedChangeHandler = handler;
    }
}