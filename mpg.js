"use strict";

var $ = function (id) {
    return document.getElementById(id);
};


var calculateMpg = function (miles, gallons) {
    var mpg = miles / gallons;
    mpg = mpg.toFixed(1);
    return mpg;
};

var createNodes = function (mpg) {
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
    var userMiles = parseFloat($("miles").value);
    var userGallons = parseFloat($("gallons").value);
    var result = validateData(userMiles, userGallons);
    var resultElement = $("mpg_result");

    if (resultElement) {
        var currentValue = resultElement.value;
        var newValue = result;

        if (currentValue !== newValue) {
            resultElement.value = newValue;
        }
    } else {
        createNodes(result);

    }
};

var validateData = function (userMiles, userGallons) {
    var isValid = true;

    if (isNaN(userMiles)) {
        $("miles_error").firstChild.nodeValue = "Miles must be numeric.";
        isValid = false;
    } else if (userMiles < 0) {
        $("miles_error").firstChild.nodeValue = "Miles must be greater than zero";
        isValid = false;
    } else {
        $("miles_error").firstChild.nodeValue = "";
    }

    if (isNaN(userGallons)) {
        $("gallons_error").firstChild.nodeValue = "Gallons must be numeric.";
        isValid = false;
    } else if (userGallons < 0) {
        $("gallons_error").firstChild.nodeValue = "Gallons must be greater than 0";
        isValid = false;
    } else {
        $("gallons_error").firstChild.nodeValue = "";
    }

    if (isValid) {
        var mpg = calculateMpg(userMiles, userGallons);
        return mpg;
    }

};

window.onload = function () {
    $("calculate_mpg").onclick = displayResult;
    //set focus to miles field initially
    $("miles").focus();
};