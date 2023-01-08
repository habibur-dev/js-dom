/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to cpy color code
 * - Add a toast message while copy code
 * - User can type hex code
 * - show RGB color too, but do not need to edit it
 * - user can also copy rgb color code
 */

// Steps:
// step - 1: create onload handler

let div = null;

window.onload = () => {
    main();
}

function main(){
    const root = document.getElementById("root");
    const btn = document.getElementById("change-btn");
    const hexCode = document.getElementById("output");
    const RGBCode = document.getElementById("output2");
    const copyBtn = document.getElementById("copy-btn");
    const copyBtn2 = document.getElementById("copy-btn2");
    hexCode.value.toUpperCase();

    btn.addEventListener('click', function(){
        const color =  generateColorDecimal();
        const hex = generateHEXColor(color);
        const rgb = generateRGBColor(color);
        root.style.backgroundColor = hex;
        hexCode.value = hex.substring(1);
        RGBCode.value = rgb;
        
    });

    copyBtn.addEventListener("click", function(){
        navigator.clipboard.writeText(`#${hexCode.value}`);
        if(div !== null){
            div.remove();
            div = null;
        }
        if(isValidHex(hexCode.value)){
            generateToastMsg(`#${hexCode.value} copied!`);
        }else{
            alert(`Invalid Color Code!`);
        }
    });

    copyBtn2.addEventListener("click", function(){
        navigator.clipboard.writeText(`${RGBCode.value}`);
        if(div !== null){
            div.remove();
            div = null;
        }
        
        if(isValidHex(hexCode.value)){
            generateToastMsg(`${RGBCode.value} copied!`);
        }else{
            alert(`Invalid Color Code!`);
        }
    });

    hexCode.addEventListener("keyup", function(e){

        const color = e.target.value;
        if(color){
            hexCode.value = color.toUpperCase();
            if(isValidHex(color)){
                root.style.backgroundColor = `#${color}`;
                RGBCode.value = hexToRGB(color);
                
            }
        }
    });
}


// function 1 - generate three random deicimal number for red. green, blue
// return as an object

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

// function 2 - generatehex color
function generateHEXColor({red, green, blue}){
    //const {red, green, blue} = generateColorDecimal();
    
    const getTwoCode = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }

    return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}

// function 3 - generate rgb color code
function generateRGBColor({red, green, blue}){
    //const {red, green, blue} = generateColorDecimal();

    return `rgb(${red}, ${green}, ${blue})`;
}

// convert hex color to rgb

/**
 * 
 * @param {string} hex 
 */
function hexToRGB(hex){
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4), 16);

    return `rgb(${red}, ${green}, ${blue})`;
}


function generateToastMsg(msg){
    div = document.createElement('div');
    div.innerText = msg;
    div.className = "toast-message toast-message-slide-in";

    div.addEventListener("click", function(){
        div.classList.remove("toast-message-slide-in");
        div.classList.add("toast-message-slide-out");

        div.addEventListener("animationend", function(){
            div.remove();
            div = null;
        });
    })


    document.body.appendChild(div);

}

/**
 * 
 * @param {string} color ;
 */

function isValidHex(color){
    if(color.length !== 6) return false;
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}



// step - 3: collect all necessary references
// step - 4: handle the change button click event
// step - 5: handle the copy button click event
// step - 6: activate toast message
// step - 7: create dynamic toast message
// step - 8: clear dynamic toast message
// step - 9: create isHex function
// step - 10: implement change handler on input field
// step - 11: prevent copying code if it is not valid
// step - 12: refector the color generator function
// step - 13: update color code to display rgb color
// step - 14: create hex to rgb function
// step - 15: update change handler
// step - 16: implement copy
