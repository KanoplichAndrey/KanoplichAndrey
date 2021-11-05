let countriesInf = {};
    function addInf(countyName, capitalName) {
         countriesInf[countyName] = capitalName;
         console.log(countriesInf)
    }
    function getCountryInfo(countryName) {
         if (countryName in countriesInf)
            return alert('страна: ' + countryName + ' столица: ' + countriesInf[countryName]);
         else
            return alert('нет информации о стране ' + countryName + '!');
    }
    function listCountrys() {
         let list = "";
         for (i in countriesInf)
            list += 'страна: ' + i + ';' + ' столица: ' + countriesInf[i] + '\n';
         alert(list)
    }
    function deleteCountry(countryName) {
         delete countriesInf[countryName];
    }