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
        //attach the nodes to the end of the form
        var parentDiv = document.getElementById("main_content");
        labelNode.appendChild(inputNode);
        parentDiv.appendChild(labelNode);

};

var displayResult = function () {
    var userMiles = parseFloat(document.getElementById("miles").value);
    var userGallons = parseFloat(document.getElementById("gallons").value);

    if (isNaN(userMiles) || isNaN(userGallons)) {
        alert("Both entries must be numeric.");
    } else {
        var mpg = calculateMpg(userMiles, userGallons);
        createNodes(mpg);
    }
};




window.onload = function () {
    $("calculate_mpg").onclick = displayResult;
    $("miles").focus();
};