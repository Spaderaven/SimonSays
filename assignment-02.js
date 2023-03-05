/**
 * Luis Daniel Santiago Gutierrez 
 * 22132503
 * 
 * Browsers Tested:
 *      Google Chrome Versión 110.0.5481.178
 *      FireFox Versión 110.0.5481.178
 * 
 * Operating System: 
 *      Windows
 */


let simon = []
let simonSpeaking = false;
let totalSimon = 0;
let playerCurrent = 0;
let playerPress = false;
let finish = false;
let interID;
let waitTime = 800;

// Returns a random number from 0 - 3
function getRandom() {
    return Math.floor(Math.random() * 4);
}

// When called uses a promise to wait the amount of secs provided
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

// Resets simons array, changes led to green, locks buttons before the game starts in 3secs
async function StartGame() {
    document.getElementById("start-button").style.pointerEvents = "none";
    simon = [];
    document.getElementById("led").style.backgroundColor = "lightgreen";
    document.getElementById("top-left").style.pointerEvents = "none";
    document.getElementById("top-right").style.pointerEvents = "none";
    document.getElementById("bottom-left").style.pointerEvents = "none";
    document.getElementById("bottom-right").style.pointerEvents = "none";
    await sleep(2000);
    document.getElementById("top-left").style.pointerEvents = "all";
    document.getElementById("top-right").style.pointerEvents = "all";
    document.getElementById("bottom-left").style.pointerEvents = "all";
    document.getElementById("bottom-right").style.pointerEvents = "all";
    AddSimon();
}

// Adds random number to simons array
function AddSimon() {
    simon.push(getRandom());
    totalSimon++;
    SimonSpeak();
}


// Goes through simons array, flashes the colors and has the delay between them
const SimonSpeak = async () => {

    simonSpeaking = true;

    for (let i = 0; i < simon.length; i++) {
        color = simon[i]
        if (color == 0) await FlashGreen();
        else if (color == 1) await FlashRed();
        else if (color == 2) await FlashYellow();
        else if (color == 3) await FlashBlue();

        if(i != (simon.length-1)){
            await sleep (waitTime)
        }
    }

    playerCurrent = 0;
    playerPress = false;
    simonSpeaking = false;    
    if(totalSimon != 0)
    PlayerSpeak();
}


// An interval with 5secs which checks if the player pressed a button or times them out
function PlayerSpeak() {
    
    if(finish) 
    {
        clearInterval(interID)
        return;
    }    

    interID = setInterval(() => {
        if(!playerPress && totalSimon!=0) {
            clearInterval(interID);            
            EndGame();
        }
    }, 5000);
}

// Resets all flags, updates scores, changes led, unlocks start button
function EndGame() {
    clearInterval(interID);
    document.getElementById("led").style.backgroundColor = "red";
    document.getElementById("display2").innerHTML = "00"
    FlashEnding();
    document.getElementById("start-button").style.pointerEvents = "all";
    

    topScore = parseInt(document.getElementById("display1").innerHTML)
    lastScore = totalSimon-1;

    if (lastScore > topScore) {
        let score = lastScore >= 10 ? lastScore : "0" + lastScore;
        document.getElementById("display1").innerHTML = score;
    }

    playerCurrent = 0;
    simon = [];
    playerPress = false;
    finish = false;
    totalSimon = 0;
    waitTime = 800;
}

// Checks if the button press is the correct button 
async function ButtonPressed (button) {
    finish = false;

    // If the player presses a button while simon is still giving the sequence it ends the game
    if(simonSpeaking)
    {
        clearInterval(interID);
        EndGame();
        return
    }

    // Checks if the button press is correct if so it resets the 5sec interval and keeps the game going
    if(button == simon[playerCurrent]) {
        playerCurrent++;
        clearInterval(interID);
        PlayerSpeak();
    } 
    else{ // If the buttton is wrong the game ends
        EndGame();
        return;
    } 

    // If the player correctly enters the current sequence then we remove the 5sec interval for now and add a new color
    if(playerCurrent == totalSimon && !finish){

        // If the player passes 5, 9, or 13 colors the time is shortened
        if(totalSimon == 5 || totalSimon == 9 || totalSimon == 13)
        {
            waitTime = waitTime/2;            
        }

        // Update current score
        clearInterval(interID);
        let score = playerCurrent >= 10 ? playerCurrent : "0" + playerCurrent;
        document.getElementById("display2").innerHTML = score;
        playerCurrent = 0;
        await sleep(800);
        finish = false;
        AddSimon();
    }

}

// Flashes all colors 5 times when game is lost
const FlashEnding = async () => {

    for (let i = 0; i < 5; i++) {
        document.getElementById("top-left").style.backgroundColor = "lightgreen";
        document.getElementById("top-right").style.backgroundColor = "lightpink";
        document.getElementById("bottom-left").style.backgroundColor = "lightgoldenrodyellow";
        document.getElementById("bottom-right").style.backgroundColor = "lightblue";
        
        await sleep(300)

        document.getElementById("top-left").style.backgroundColor = "green";
        document.getElementById("top-right").style.backgroundColor = "red";
        document.getElementById("bottom-left").style.backgroundColor = "yellow";
        document.getElementById("bottom-right").style.backgroundColor = "blue";

        await sleep(300)
    }
}

// These functions just flash the color that Simon needs
async function FlashGreen() {
    document.getElementById("top-left").style.backgroundColor = "lightgreen";
    await sleep(300)
    document.getElementById("top-left").style.backgroundColor = "green";
}

async function FlashRed() {
    document.getElementById("top-right").style.backgroundColor = "lightpink";
    await sleep(300)
    document.getElementById("top-right").style.backgroundColor = "red";
}

async function FlashYellow() {
    document.getElementById("bottom-left").style.backgroundColor = "lightgoldenrodyellow";
    await sleep(300)
    document.getElementById("bottom-left").style.backgroundColor = "yellow";
}

async function FlashBlue() {
    document.getElementById("bottom-right").style.backgroundColor = "lightblue";
    await sleep(300)
    document.getElementById("bottom-right").style.backgroundColor = "blue";
}

