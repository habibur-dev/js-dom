/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to cpy color code
 * - Add a toast message while copy code
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
    const hexCode = document.getElementById("hexCode");
    const copyBtn = document.getElementById("copy-btn");

    btn.addEventListener('click', function(){
        const GetColor = generateHEXColor();
        root.style.backgroundColor = GetColor;
        hexCode.value = GetColor;
    });

    copyBtn.addEventListener("click", function(){
        navigator.clipboard.writeText(hexCode.value);
        if(div !== null){
            div.remove();
            div = null;
        }
        generateToastMsg(`${hexCode.value} copied!`);
    });
}
// step - 2: random color generator function
function generateHEXColor(){
    const red = Math.floor(Math.random() * 255 + 1);
    const green = Math.floor(Math.random() * 255 + 1);
    const blue = Math.floor(Math.random() * 255 + 1);
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
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

// step - 3: collect all necessary references
// step - 4: handle the change button click event
// step - 5: handle the copy button click event
// step - 6: activate toast message
// step - 7: create dynamic toast message
// step - 8: clear dynamic toast message
