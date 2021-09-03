let chet = 1;
			window.onload = function () { setTimeout(frout, 4000); }
			function frout() {
			chet++;
			if (chet>2) {chet=0;}
				switch(chet) {
				case 1:
					div.style.cssText=` background:  url('cuba.jpg') center top no-repeat ;`
					break;
				case 2:
					div.style.cssText=` background:  url('gavana-i-znamenitiy-retro-avtomobil.jpg') center top no-repeat;`
					break;
				

				}
			setTimeout(frout, 4000);
			}






//div.style.cssText=` background:  url('cuba.jpg') center top no-repeat;

//`