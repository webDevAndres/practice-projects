"use strict";

var $ = function (id) {
    return document.getElementById(id);
};


var calculateMpg = function (miles, gallons) {
    var mpg = miles / gallons;
    mpg = mpg.toFixed(1);
    return mpg;
};

var createNodes = function () {
    //create a new node
    var inputNode = document.createElement('input');
    var labelNode = document.createElement('label');
    //set up input element with type, id and the disabled attribute
    inputNode.type = "text";
    inputNode.id = "mpg_result";
    inputNode.setAttribute("disabled", true);
    //set the the text and attribute of the label element
    labelNode.textContent = "Miles Per Gallon";
    labelNode.setAttribute("for", "mpg_result");
    labelNode.id = "mpg_result_Label"
    //attach the nodes to the end of the form
    var parentDiv = document.getElementById("main_content");
    labelNode.style.display = "none";
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
        updateMpg(mpg);
    }
};

var updateMpg = function (mpg) {
    //display result element and update its value
    var result_element = $("mpg_result")
    result_element.value = mpg;
    result_element.parentNode.style.display = "inline-block";
}

var hideNodes = function () {
    //set result display to none
    $("mpg_result").parentNode.style.display = "none";
}

window.onload = function () {
    $("calculate_mpg").onclick = displayResult;
    //create and hide results nodes
    createNodes();
    //set listeners to hide results nodes when user clicks into field to change mileage or gallons
    $("miles").onfocus = hideNodes;
    $("gallons").onfocus = hideNodes;
    //set focus to miles field initially
    $("miles").focus();
};