let countriesH = {};
document.querySelector('.button1').addEventListener('click', () => addInf(prompt("Введите название страны:"), prompt("Введите её столицу:")))
document.querySelector('.button2').addEventListener('click', () => getCountryInfo(prompt("Введите название страны:")))
document.querySelector('.button3').addEventListener('click', listCountrys)
document.querySelector('.button4').addEventListener('click', () => deleteCountry(prompt("Назовите страну, которую вы хотите удалить из списка?")))




    function addInf(countyName, capitalName) {
        countriesH[countyName] = capitalName;
        console.log(countriesH)
     }
     function getCountryInfo(countryName) {
        if (countryName in countriesH)
           return alert('страна: ' + countryName + ' столица: ' + countriesH[countryName]);
        else
           return alert('нет информации о стране ' + countryName + '!');
     }
     function listCountrys() {
        let list = "";
        for (i in countriesH)
           list += 'страна: ' + i + ';' + ' столица: ' + countriesH[i] + '\n';
        alert(list)
     }
     function deleteCountry(countryName) {
        delete countriesH[countryName];
     }
    



