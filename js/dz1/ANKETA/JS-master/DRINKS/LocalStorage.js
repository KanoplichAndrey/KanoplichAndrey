/**
 * Created by dmitry.sobolevsky on 29.01.2017.
 */
"use strict";



function TLocalStorage (name)
{
    var self=this;
    self.name=name;
    self.storage={};

    self.SaveLocalStorage=function (obj) {
        localStorage.setItem(self.name,JSON.stringify(obj));

    };
    self.LoadLocalStorage=function () {
        var obj=JSON.parse(localStorage.getItem(self.name));
        return obj;

    };
    if(localStorage[self.name]){
        self.storage=self.LoadLocalStorage();
    }


    self.AddValue=function(Key,Value)
    {
      self.storage[Key]=Value;
      self.SaveLocalStorage(self.storage);
    };

    self.GetValue=function(Key){
        return self.storage[Key];
    };

    self.DeleteValue=function(Key){

        if (self.storage[Key]!=undefined) {
            delete self.storage[Key];
            self.SaveLocalStorage(self.storage);
            return true;
        } else {

            return false;
        }
    };

    self.GetKeys=function(){
        var all_keys=[];
        for (var key in self.storage) {
            all_keys.push(key);
        }
            return all_keys;

    };

}










