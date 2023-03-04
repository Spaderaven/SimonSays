let simon = []
let simonSpeaking = false;
let totalSimon = 0;
let playerCurrent = 0;
let playerPress = false;
let finish = false;
let interID;
let waitTime = 600;

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

// Resets simons array, locks start button and changes led to green
async function StartGame() {
    document.getElementById("start-button").style.pointerEvents = "none";
    simon = [];
    document.getElementById("led").style.backgroundColor = "lightgreen";
    await sleep(2000);
    AddSimon();
}

// Adds random number to simons array
function AddSimon() {
    simon.push(getRandom());
    totalSimon++;
    console.log("Simon: ", simon);
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

    console.log("MY TUUUURN");
    playerCurrent = 0;
    playerPress = false;
    simonSpeaking = false;
    PlayerSpeak();
}


// An interval with 5secs which checks if the player press a button or times them out
function PlayerSpeak() {

    // console.log("FINSHD?", finish);
    if(finish) return;

    // console.log("FINSHD?", finish);
    interID = setInterval(() => {
        if(!playerPress) {
            console.log("--CANCELD INTERVAL--");
            console.log("NEW ID   ", interID);
            clearInterval(interID);
            EndGame();
        }
    }, 5000);
}

// Resets all flags, updates scores, changes led, unlocks start button
function EndGame() {
    document.getElementById("led").style.backgroundColor = "red";
    document.getElementById("display2").innerHTML = "00"
    FlashEnding();
    document.getElementById("start-button").style.pointerEvents = "all";
    console.log("FIIIIIIIIIIIIN");
    console.log("DEAD ID", interID);
    clearInterval(interID);

    topScore = parseInt(document.getElementById("display1").innerHTML)
    console.log("TIP SOCRE", topScore);
    lastScore = totalSimon-1;

    if (lastScore > topScore) {
        let score = lastScore >= 10 ? lastScore : "0" + lastScore;
        document.getElementById("display1").innerHTML = score;
    }

    playerCurrent = 0;
    simon = [];
    playerPress = false;
    totalSimon = 0;
    waitTime = 600;
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

// Checks if the button press is the correct button 
async function ButtonPressed (button) {
    finish = false;

    console.log("PRESSED ", button);

    // If the player presses a button while simon is still giving the sequence it ends the game
    if(simonSpeaking)
    {
        clearInterval(interID);
        console.log("--WAIT FOR SIMON--");
        EndGame();
        finish = true;
    }

    // Checks if the button press is correct if so it resets the 5sec interval and keeeps the cam going
    if(button == simon[playerCurrent]) {
        playerCurrent++;
        clearInterval(interID);
        PlayerSpeak();
    } 
    else{ // If the buttton is wrong the game ends
        console.log("--WRONG BUTTON--", button, simon[playerCurrent], playerCurrent);
        EndGame();
        finish = true;
    } 

    // If the player correctly enters the current sequence then we remove the 5sec interval for now and add a new color
    if(playerCurrent == totalSimon && !finish){

        // If the player passes 5, 9, or 13 colors the time is shortened
        if(totalSimon == 5 || totalSimon == 9 || totalSimon == 13)
        {
            console.log("WAITTIME -- ", waitTime);
            waitTime = waitTime/2;
            console.log("WAITTIME -- ", waitTime);
        }

        clearInterval(interID);
        let score = playerCurrent >= 10 ? playerCurrent : "0" + playerCurrent;
        document.getElementById("display2").innerHTML = score;
        playerCurrent = 0;
        await sleep(800);
        AddSimon();
    }

}


// These functions just flash the color that Simon needs
async function FlashGreen() {
    document.getElementById("top-left").style.backgroundColor = "lightgreen";
    await sleep(300)
    console.log("GREEN");
    document.getElementById("top-left").style.backgroundColor = "green";
}

async function FlashRed() {
    document.getElementById("top-right").style.backgroundColor = "lightpink";
    await sleep(300)
    console.log("RED");
    document.getElementById("top-right").style.backgroundColor = "red";
}

async function FlashYellow() {
    document.getElementById("bottom-left").style.backgroundColor = "lightgoldenrodyellow";
    await sleep(300)
    console.log("YELLOW");
    document.getElementById("bottom-left").style.backgroundColor = "yellow";
}

async function FlashBlue() {
    document.getElementById("bottom-right").style.backgroundColor = "lightblue";
    await sleep(300)
    console.log("BLUE");
    document.getElementById("bottom-right").style.backgroundColor = "blue";
}