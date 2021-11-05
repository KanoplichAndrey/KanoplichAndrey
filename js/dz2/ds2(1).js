let countriesH = {};
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