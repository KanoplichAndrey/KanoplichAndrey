let chet = 1;
			window.onload = function () { setTimeout(frout, 3000); }
			function frout() {
			chet++;
			if (chet>5) {chet=0;}
				switch(chet) {
				case 1:
					div.style.cssText=` background:  url('cuba.jpg') center top no-repeat;`
					break;
				case 2:
					div.style.cssText=` background:  url('gavana-i-znamenitiy-retro-avtomobil.jpg') center top no-repeat;`
					break;
				case 3:
					div.style.cssText=` background:  url('3.jpg') left top no-repeat;`
					break;
            case 4:
               div.style.cssText=` background:  url('4.jpg') right top no-repeat;`
               break;
            case 5:
               div.style.cssText=` background:  url('5.jpg') left top no-repeat;`
               break;      

				}
			setTimeout(frout, 3000);
			}






//div.style.cssText=` background:  url('cuba.jpg') center top no-repeat;

//`