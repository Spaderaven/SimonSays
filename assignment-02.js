let simon = []
let simonSpeaking = false;
let playerPress = false;
let totalSimon = 0;
let playerCurrent = 0;
let interID;
let waitTime = 1000;
let finish = false;

function getRandom() {
    return Math.floor(Math.random() * 4);
  }

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

async function StartGame() {
    simon = [];
    document.getElementById("led").style.backgroundColor = "lightgreen";
    await sleep(3000);
    AddSimon();
}

function AddSimon() {
    simon.push(getRandom());
    totalSimon++;
    console.log("Simon: ", simon);
    SimonSpeak();
}

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

async function FlashGreen() {
    document.getElementById("top-left").style.backgroundColor = "lightgreen";
    await sleep(350)
    console.log("GREEN");
    document.getElementById("top-left").style.backgroundColor = "green";
}

async function FlashRed() {
    document.getElementById("top-right").style.backgroundColor = "lightpink";
    await sleep(350)
    console.log("RED");
    document.getElementById("top-right").style.backgroundColor = "red";
}

async function FlashYellow() {
    document.getElementById("bottom-left").style.backgroundColor = "lightgoldenrodyellow";
    await sleep(350)
    console.log("YELLOW");
    document.getElementById("bottom-left").style.backgroundColor = "yellow";
}

async function FlashBlue() {
    document.getElementById("bottom-right").style.backgroundColor = "lightblue";
    await sleep(350)
    console.log("BLUE");
    document.getElementById("bottom-right").style.backgroundColor = "blue";
}

function PlayerSpeak() {

    console.log("FINSHD?", finish);
    if(finish) return;

    console.log("FINSHD?", finish);
    interID = setInterval(() => {
        if(!playerPress) {
            console.log("CANCELD INTERVAL");
            console.log("NEW ID   ", interID);
            clearInterval(interID);
            EndGame();
        }
    }, 5000);
}


function EndGame() {
    document.getElementById("led").style.backgroundColor = "red";
    document.getElementById("display2").innerHTML = "00"
    FlashEnding();
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
}

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



async function ButtonPressed (button) {
    finish = false;

    if(simonSpeaking)
    {
        clearInterval(interID);
        EndGame();
        finish = true;
    }

    if(button == simon[playerCurrent]) {

        if(totalSimon == 5 || totalSimon == 9 || totalSimon == 13)
        {
            waitTime = waitTime - 250;
        }

        clearInterval(interID);
        PlayerSpeak();
        playerCurrent++;
    } 
    else{
        EndGame();
        finish = true;
    } 

    if(playerCurrent == totalSimon && !finish){
        clearInterval(interID);
        let score = playerCurrent >= 10 ? playerCurrent : "0" + playerCurrent;
        document.getElementById("display2").innerHTML = score;
        playerCurrent = 0;
        await sleep(800);
        AddSimon();
    }

}