let simon = []
const player = []
let playerPress = false;
let totalSimon = 0;
let playerCurrent = 0;

function getRandom() {
    return Math.floor(Math.random() * 4);
  }

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

function StartGame() {
    simon = [];
    document.getElementById("led").style.backgroundColor = "lightgreen";
    AddSimon();
}

function AddSimon() {
    simon.push(getRandom());
    totalSimon++;
    console.log("Simon: ", simon);
    SimonSpeak();
}

const SimonSpeak = async () => {

    for (let i = 0; i < simon.length; i++) {
        color = simon[i]
        if (color == 0) FlashGreen();
        else if (color == 1) FlashRed();
        else if (color == 2) FlashYellow();
        else if (color == 3) FlashBlue();
        await sleep (1000)
    }

    console.log("MY TUUUURN");
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
    let interID = setInterval(() => {



        if(playerPress) {
            playerPress = false;
            if(!ColorsRight()) {
                clearInterval(interID);
                EndGame();
            }
        }
        else {
            clearInterval(interID);
            EndGame();
        }
    }, 5000);
}


function ColorsRight() {
    for (let i = 0; i < player.length; i++) {
        if(simon[i] != player[i]) return false;
    }

    return true;
}


function EndGame() {
    document.getElementById("led").style.backgroundColor = "red";
    console.log("FIIIIIIIIIIIIN");
}


function ButtonPressed (button) {
    player.push(button);
    console.log("PLAYER: ", player);
    if(button == simon[playerCurrent]){
        playerCurrent++;
        AddSimon();
    }
    else
        EndGame();
}