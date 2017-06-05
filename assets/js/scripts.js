"use strict";

// Esta funcion es solo un test
function first_test() {
    return "This is a test";
};


// Esta funcion es otro test en main
var firstTest = first_test();

if(firstTest == undefined) 
{
    var second_test = function()
    {
        return firstTest;
    };
};

// Ultima funcion
var square = function(x) {
  return x * x;
};

alert('test');