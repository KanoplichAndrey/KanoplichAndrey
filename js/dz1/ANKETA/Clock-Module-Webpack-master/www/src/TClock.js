export class Model {
    constructor(timezone) {
        this.timezone = timezone; 
        this.changeListener = null;        
                // модель предоставляет поле date для чтения извне
        this.hours = new Date(Date.now() + (this.timezone - 3) * 3600000).getHours();
        this.mimutes = new Date(Date.now() + (this.timezone - 3) * 3600000).getMinutes();
        this.seconds = new Date(Date.now() + (this.timezone - 3) * 3600000).getSeconds();
                // модель обновляет себя
        setInterval(() => {            
            this.hours = new Date(Date.now() + (this.timezone - 3) * 3600000).getHours();
            
            this.mimutes = new Date(Date.now() + (this.timezone - 3) * 3600000).getMinutes();
            
            this.seconds = new Date(Date.now() + (this.timezone - 3) * 3600000).getSeconds();
            
            if (typeof (this.changeListenerCallback) === 'function') {
                        // и нотифицирует слушателя путем вызова
                        // его функции обратного вызова
                this.changeListenerCallback();
            }
        }, 1000);
    }

    setChangeListener(changeListener) {
        this.changeListenerCallback = changeListener;
    }
}
