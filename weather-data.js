"use strict";
*/ Using this constructor. For _temperature, we are setting this initially as an empty
//string for now because the format is in metric and we want to convert it to F on our 
//app. We want to set up a setter and getter that when we pass a value to this field, it is
//converted to F. For this to work, we are using the Object.defineProperty then we add it to 
//our Weather prototype--then temperature is the name of the property we want to define.So
//when we access the temperature, in the background, it will access & change _temperature.
//As the 3rd property, we will configure this property with a JS object. The way we configure it is
//we provide a get: function. Whenever we get this, we return this._temperature. 
//If we want to set: it, we will not just pass the value that we get, we will convert/set
//this temperature to be value * 1.8 + 32 then set it .toFix to round it to 2 decimal places
//then attach the 'F' 


function Weather(cityName, description) {
    this.cityName = cityName;
    this.description = description;
    this._temperature = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
    get: function() {
        return this._temperature;
    },
    set: function(value) {
        this._temperature = (value * 1.8 + 32).toFixed(2) + 'F.';
    }
});