/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 */

// Steps:
// step - 1: create onload handler
window.onload = () => {
    main();
}

function main(){
    const root = document.getElementById("root");
    const btn = document.getElementById("change-btn");
    const hexCode = document.getElementById("hexCode");

    btn.addEventListener('click', function(){
        const GetColor = generateHEXColor();
        root.style.backgroundColor = GetColor;
        hexCode.value = GetColor;
    })
}
// step - 2: random color generator function
function generateHEXColor(){
    const red = Math.floor(Math.random() * 255 + 1);
    const green = Math.floor(Math.random() * 255 + 1);
    const blue = Math.floor(Math.random() * 255 + 1);
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
// step - 3: collect all necessary references
// step - 4: handle click event
