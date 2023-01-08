/**
 * Color Picker Application
 */

// Globals
let toastContainer = null;
const defaultColor = {
    red: 221,
    green: 222,
    blue: 238
}

// onload handler
window.onload = () => {
    main();
    updateColorCodeToDom(defaultColor);
}

// main function, this function will take care of all DOM reference
function main(){

    // dom references
    const generateRandomColorBtn = document.getElementById("generate-random-color");
    const colorModHexInp = document.getElementById("input-hex");
    const colorSliderRed = document.getElementById("color-slider-red");
    const colorSliderGreen = document.getElementById("color-slider-green");
    const colorSliderBlue = document.getElementById("color-slider-blue");
    const copyToCLipboardBtn = document.getElementById("copy-to-clipboard");
    //const colorModeRadios = document.getElementsByName("color-mode");

    //event listeners
    generateRandomColorBtn.addEventListener('click', handleGenerateRandomColorBtn);
    colorModHexInp.addEventListener("keyup", handleColorModehexInp);
    colorSliderRed.addEventListener("change", handleColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
    colorSliderGreen.addEventListener("change", handleColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
    colorSliderBlue.addEventListener("change", handleColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
    copyToCLipboardBtn.addEventListener("click", handleCopToClipboard);

}

// event handlers

function handleGenerateRandomColorBtn(){
    const color =  generateColorDecimal();
    updateColorCodeToDom(color);
    
}

function handleColorModehexInp(e){

    const hexCoolor = e.target.value;
    if(hexCoolor){
        this.value = hexCoolor.toUpperCase();
        if(isValidHex(hexCoolor)){
            const color = hexToDecimalColor(hexCoolor);
            updateColorCodeToDom(color);
        }
    }
}

function handleColorSlider (colorSliderRed, colorSliderGreen, colorSliderBlue){

    return function(){
        const color = {
            red: parseInt(colorSliderRed.value),
            green: parseInt(colorSliderGreen.value),
            blue: parseInt(colorSliderBlue.value),
        }
        updateColorCodeToDom(color);
    }
}

function handleCopToClipboard(){
    const colorModeRadios = document.getElementsByName("color-mode");
    const mode =  getCheckedValueFromRadios(colorModeRadios);
    if(mode === null){
        throw new Error("Invalid Radio Input!");
    }

    if(toastContainer !== null){
        toastContainer.remove();
        toastContainer = null;
    }


    if(mode === 'hex'){
      const hexColor = document.getElementById("input-hex").value;
      if(hexColor && isValidHex(hexColor)){
        navigator.clipboard.writeText(`#${hexColor}`);
        generateToastMsg(`#${hexColor} Copied!`);
        setTimeout(function(){
            toastContainer.remove();
        }, 3000);
      }else{
        alert("Invalid Hex Code");
      }
      
    }else{
        const rgbColor = document.getElementById("input-rgb").value;
        if(rgbColor){
            navigator.clipboard.writeText(rgbColor);
            generateToastMsg(`${rgbColor} Copied!`);
            setTimeout(function(){
                toastContainer.remove();
            }, 3000);
        }else{
            alert("Invalid RGB Color");
        }
    }

    
}

// DOM functions

/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} msg 
 */

function generateToastMsg(msg){
    toastContainer = document.createElement('div');
    toastContainer.innerText = msg;
    toastContainer.className = "toast-message toast-message-slide-in";

    toastContainer.addEventListener("click", function(){
        toastContainer.classList.remove("toast-message-slide-in");
        toastContainer.classList.add("toast-message-slide-out");

        toastContainer.addEventListener("animationend", function(){
            toastContainer.remove();
            toastContainer = null;
        });
    })
    document.body.appendChild(toastContainer);
    
    
}

/**
 * Find the checked elements from a list of radio buttons
 * @param {Array} nodes 
 * @returns {string | null}
 */
function getCheckedValueFromRadios(nodes){
    let checkedValue = null;
    for(let i=0; i < nodes.length; i++){
        if(nodes[i].checked){
            checkedValue = nodes[i].value;
            break;
        }
    }

    return checkedValue;
}

/**
 * update dom elements with calculated color values
 * @param {object} color 
 */

function updateColorCodeToDom(color){
    const hexColor = generateHEXColor(color);
    const rgbColor = generateRGBColor(color);

    document.getElementById("color-display").style.backgroundColor = `#${hexColor}`;
    document.getElementById("input-hex").value = hexColor;
    document.getElementById("input-rgb").value = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;
    document.getElementById("color-slider-red").value = rgbColor.red;
    document.getElementById("color-slider-red-label").innerText = rgbColor.red;
    document.getElementById("color-slider-green").value = rgbColor.green;
    document.getElementById("color-slider-green-label").innerText = rgbColor.green;
    document.getElementById("color-slider-blue").value = rgbColor.blue;;
    document.getElementById("color-slider-blue-label").innerText = rgbColor.blue;


}

// utility functions

/**
 * generate and return an object of three decimal values
 * @returns {object}
 */
function generateColorDecimal(){
    const red = Math.floor(Math.random() * 255 + 1);
    const green = Math.floor(Math.random() * 255 + 1);
    const blue = Math.floor(Math.random() * 255 + 1);

    return {
        red,
        green,
        blue
    }
}

/**
 * take a color object of three decimal values and return a hexadecimal color code
 * @param {object} color
 * @returns {string}
 */


function generateHEXColor({red, green, blue}){
    
    const getTwoCode = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }

    return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}

/**
 * take a color object of three decimal values and return a rgb color code
 * @param {object} color
 * @returns {string}
 */

function generateRGBColor({red, green, blue}){

    return {
        red,
        green,
        blue 
     };
}

/**
 * convert hex color to decimal colors object
 * @param {string} hex 
 * @returns {object}
 */
function hexToDecimalColor(hex){
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4), 16);

    return {
       red,
       green,
       blue 
    };
}

/**
 * Validate hex color code 
 * @param {string} color ;
 * @returns {boolean}
 */

function isValidHex(color){
    if(color.length !== 6) return false;
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}