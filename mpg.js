"use strict";

var $ = function (id) {
    return document.getElementById(id);
};


var calculateMpg = function (miles, gallons) {
    var mpg = miles / gallons;
    mpg = mpg.toFixed(1);
    return mpg;
};

var createMpgNodes = function (mpg) {
    //create a new node
    var inputNode = document.createElement('input');
    var labelNode = document.createElement('label');
    //set up input element with type, id and the disabled attribute
    inputNode.type = "text";
    inputNode.id = "mpg_result";
    inputNode.setAttribute("disabled", true);
    //get the calculated mpg from the parameter and set the value of the inputNode
    inputNode.value = mpg;
    //set the the text and attribute of the label element
    labelNode.textContent = "Miles Per Gallon";
    labelNode.setAttribute("for", "mpg_result");

    if (!isNaN(inputNode.value)) {
        //attach the nodes to the end of the form
        var parentDiv = document.getElementById("main_content");
        labelNode.appendChild(inputNode);
        parentDiv.appendChild(labelNode);
    }

};

var displayResult = function () {
    var isValid = validateData();
    if (isValid) {
        var userMiles = parseFloat($("miles").value);
        var userGallons = parseFloat($("gallons").value);
        var resultElement = $("mpg_result");
        var newValue = calculateMpg(userMiles, userGallons);

        if (resultElement) {
            var currentValue = resultElement.value;
            if (currentValue !== newValue) {
                resultElement.value = newValue;
            }
        } else {
            createMpgNodes(newValue);
        }
    }
};

var validateData = function () {
    //confirm both elements and return boolean value - ideally both should be true
    var validMiles = validateElement($("miles"));
    var validGallons = validateElement($("gallons"));
    return (validMiles && validGallons);
}

var validateElement = function (inputElement) {
    //error name is the element ID + the word _error
    var errorElementName = inputElement.id + "_error";
    //the element id is the first word of the error text - uppercase the 1st letter, too
    var firstChar = inputElement.id.charAt(0).toUpperCase();
    var errorTextName = firstChar + inputElement.id.slice(1);
    //reject NaN and text-based entries.
    if (isNaN(inputElement.value) || inputElement.value.trim() == "") {
        $(errorElementName).firstChild.nodeValue = errorTextName + " must be numeric.";
        return false;
    //reject negative values.
    } else if (inputElement.value <= 0) {
        $(errorElementName).firstChild.nodeValue = errorTextName + " must be greater than zero";
        return false;
    } else {
        $(errorElementName).firstChild.nodeValue = "";
        return true;
    }
};

var assignDefaultEnterAction = function () {
    addListener($("miles"));
    addListener($("gallons"));
};

var addListener = function (element) {
    element.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            $("calculate_mpg").click();
        }
    });
};

window.onload = function () {
    assignDefaultEnterAction();
    $("calculate_mpg").onclick = displayResult;
    $("miles").focus();
};
