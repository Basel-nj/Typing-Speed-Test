// Array Of Words 
//will show a random word ,
//then will pop it when the player write it
let words = [
    "code",
    "Town",
    "Hello",
    "Scala",
    "Funny",
    "Tasks",
    "Roles",
    "Github",
    "Python", 
    "Runner",
    "Testing",
    "Working",
    "Reponse",
    "Youtube",
    "Styling",
    "Cascade",
    "Twitter",
    "Computer",
    "compiler",
    "Leetcode",
    "Internet",
    "Paradigm",
    "Linkedin",
    "facebook",
    "Javascript",
    "Engennering",
    "Programming",
    "Dependencies",
    "Destructuring",
    "Documentation",
];
let easyWords = [
    "Css",
    "HTML",
    "Wifi",
    "Easy",
    "hard",
    "level",
    "Logic",
    "Normal",
    "Design",
    "Laptop",
    "Social",
    "website"
];
let normalWords = [
    "Analysis",
    "software",
    "Hardware",
    "Parameter",
    "Algorithm",
    "Interface",
    "Structure",
    "functional",
    "Information",
    "Application",
    "Development",
];
let hardWords = [
    "Parameter",
    "Algorithm",
    "Interface",
    "Structure",
    "Paragraph",
    "FrameWork",
    "components",
    "functional",
    "Information",
    "Application",
    "Development",
    "interruption",
    "Communication",
    "Concatenation",
    "User Interface",
    "User Experience",
    "Markup Language",
    "System Analysis",
];

//Finishing The Game Status
let isGameEnd = false;

//Settings lvels
let lvls = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 3,
    "Random" : 4,
};

//Catch Selectors

let selectLevel =  document.querySelector(".select-level")
let levels =  document.querySelectorAll(".select-level span")
let lastscoreDiv = document.querySelector(".last-score");
let lastScore = document.querySelector(".last-score .last");
let lastLevel = document.querySelector(".last-score .level");
let lastDate = document.querySelector(".last-score .date");
let messageDiv = document.querySelector(".message");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-words");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");


//Defualt Levels
let defualtLevelName = "Normal"; //Chang Level From Here
//set the Seconds of Level
let defualtLevelSeconds = lvls[defualtLevelName];

//Settings Level name + Seconds + Score
lvlNameSpan.innerHTML = defualtLevelName;
secondsSpan.innerHTML = defualtLevelSeconds;
timeLeftSpan.innerHTML = defualtLevelSeconds;
scoreTotal.innerHTML = words.length;

//Start Game 

// 1- Hidding The Last Score and Start Button and input field
    //Last Score Already hidden
    //hidding the Start Button and input field
    startButton.style.display = "none";
    input.style.display = "none";

//2-choosing the Level
levels.forEach((span)=>{
    span.onclick = function(){
        //set The Levle
        defualtLevelName = span.className;
        //set the Seconds of Level
        defualtLevelSeconds = lvls[defualtLevelName];
        //Hidding The Select Level Div
        selectLevel.style.display = "none"
        //Showing The Last Score and Start Button and input field
        showLastScore();
        startButton.style.display = "block";
        input.style.display = "block";
        selectingLevels();
    }
});

//3-selecting Levels
function selectingLevels(){
    //setting the words Array baseing on level chooseing
    if(defualtLevelName === "Easy"){
        words = Array.prototype.concat(words.splice(0,18),easyWords);
    }
    else if(defualtLevelName === "Normal"){
        words = Array.prototype.concat(words.splice(10,30),normalWords);
    }
    else if(defualtLevelName === "Hard"){
        words = Array.prototype.concat(words.splice(18,30),hardWords);
    }
    //else Will Select Random level With defualt Data
}

//Disable Past Event
input.onpaste =function(){
    return false;
};

startButton.onclick = function(){
    this.remove();
    input.focus();
    //Generate Word Function
    genWords();
};

function genWords(){
    //Get Random Word From Array 
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //Get Word Index
    let wordIndex = words.indexOf(randomWord);
    //Remove Word From Array
    words.splice(wordIndex,1);
    // show The Random Word
    theWord.innerHTML = randomWord;
    //Empty Upcoming Word
    upcomingWords.innerHTML = "";
    //Generate Upcomming Word
    for(let i=0; i<words.length;i++){
        //Creat Element Div
        let div = document.createElement("div");
        let nodeText = document.createTextNode(words[i]);
        div.appendChild(nodeText);
        upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
}

input.onkeyup = function(e){
    console.log(e)
    console.log(e.key === "Enter")
}

function startPlay(){
    //Reset The Time and adding 3 secondes for the first word
    words.length === 29 ?
    timeLeftSpan.innerHTML = defualtLevelSeconds + 3 : 
    timeLeftSpan.innerHTML = defualtLevelSeconds;
    let start = setInterval(()=> {
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML== 0){
            //stop Timer
            clearInterval(start);
            //Compare Words
            if(theWord.innerHTML.toLowerCase() === input.value.toLocaleLowerCase()){
                //Empty input field
                input.value = "";
                //increas Score 
                scoreGot.innerHTML++;
                //Generate New word 
                if(words.length > 0){
                    //Generate Word Function
                    genWords();
                }
                else{
                    //Finish Game
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanTxt = document.createTextNode("Congrats !");
                    span.appendChild(spanTxt);
                    finishMessage.appendChild(span)
                    // Remove upcoming div
                    upcomingWords.remove();
                    //Storage Last Score
                    setLastScore();
                    //set The Status of Play
                    isGameEnd = true;
                    //Replay function
                    replay();
                
                }
            }else{
                //Lose Game
                let span = document.createElement("span");
                span.className = "bad";
                let spanTxt = document.createTextNode("Game Over");
                span.appendChild(spanTxt);
                finishMessage.appendChild(span);
                //Storage Last Score
                setLastScore();
                //set The Status of Play
                isGameEnd = true;
                //Replay function
                replay();
            }
        }
    },1000);
}
//Seting the Last Score in local storage with date
function setLastScore(){
    const scoreInfo =  {
        score:scoreGot.innerHTML,
        level: defualtLevelName,
        //fetch the Current Date Without "T" & "Z" Noted
        date: new Date().toJSON().slice(0,10) + " " +new Date().toJSON().slice(11,19),
    }

    window.localStorage.setItem("lastScore",JSON.stringify(scoreInfo));
};
// showing the Last Score with date From Local Storage
function showLastScore(){
    if(localStorage.getItem("lastScore")){
        let data = JSON.parse(localStorage.getItem("lastScore"));
        let score = data.score;
        let level = data.level
        let dateOfLastScore = data.date;
        //Push Data in the div 
        lastscoreDiv.style.display = "block";
        lastScore.innerHTML = score;
        lastLevel.innerHTML = level;
        lastDate.innerHTML = dateOfLastScore;
    }
};
// Generate Re Play Function 
function replay(){
    if(isGameEnd){
        //Hidding The the Word Div + input field + and empty the message div
        theWord.innerHTML = "";
        input.remove();
        upcomingWords.remove()
        // Re setting the message Div
        messageDiv.innerHTML  = "Re Play";
        // Styling the Div
        messageDiv.classList.add("re-play");
        //ReStart The Game by Click
        messageDiv.addEventListener("click",function(){
            window.location.reload();
        });
    }
}