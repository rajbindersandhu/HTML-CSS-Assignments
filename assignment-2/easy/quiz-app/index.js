import {quizData} from "./data.js"

let randomIndex = Math.floor(Math.random()*quizData.length);
let firstQuestion = quizData[randomIndex];

function addQuestion(questionObjt){
    const formNode = document.createElement("form");
    const questionNode = document.createElement("p");
    questionNode.setAttribute("id","question-label");
    questionNode.innerText = questionObjt["question"];
    formNode.append(questionNode);

    for(let i=0;i<4;i++){
        const optionRadioNode = document.createElement("input");
        optionRadioNode.setAttribute("type", "radio");
        optionRadioNode.setAttribute("id", `option-${i}`);
        optionRadioNode.setAttribute("name", "option");
        optionRadioNode.setAttribute("value", i==0?"a": i==1?"b": i==2?"c":"d");
        optionRadioNode.required = true;
        const optionLable = document.createElement("label");
        optionLable.setAttribute("for", `option-${i}`);
        optionLable.innerText = i==0?questionObjt["a"]: i==1?questionObjt["b"]: i==2?questionObjt["c"]:questionObjt["d"];
        formNode.appendChild(optionRadioNode);
        formNode.appendChild(optionLable);
        formNode.appendChild(document.createElement("br"));
    }

    const containerDiv = document.getElementById("text-box");
    if(containerDiv.hasChildNodes()){
        containerDiv.removeChild(containerDiv.firstChild);
    }

    containerDiv.appendChild(formNode);
}


addQuestion(firstQuestion);

let questionMem = [];
let requiredIndex = randomIndex;

function analyzeAnswer(){
    const radioBtns = document.getElementsByName("option");
    console.log("radion btn list: \n"+radioBtns);
    const curntQuesState = {
        "question": quizData[requiredIndex]["question"],
    }
    for(let i=0;i<radioBtns.length;i++){
        if(radioBtns[i].checked){
            if(radioBtns[i].value == quizData[requiredIndex]["correct"]){
                curntQuesState["success"] = true;
            }else{
                curntQuesState["success"] = false;
            }
        }
    }
    if(!("success" in curntQuesState)){
        alert("No option Selected")
        throw new Error("no option selected")
    }
    questionMem.push(curntQuesState);
}

function addWinner(){
    const textBox = document.getElementById("text-box");
    const btnTag = document.getElementById("btn");
    btnTag.innerText = "Replay"
    textBox.removeChild(textBox.firstChild);

    const winnerPara = document.createElement("p");
    winnerPara.setAttribute("id", "winner");
    let numberOfCorrectQues = 0;
    for(let i=0;i<questionMem.length;i++){
        if(questionMem[i].success){
            numberOfCorrectQues += 1;
        }
    }

    winnerPara.innerText = `${numberOfCorrectQues}/4 question correct`
    textBox.appendChild(winnerPara);

}

function resetGame(){
    randomIndex = Math.floor(Math.random()*quizData.length);
    addQuestion(quizData[randomIndex]);
    requiredIndex = randomIndex;
    questionMem = [];
    document.getElementById("btn").innerText = "Submit"
}

function handelClick(e){
    if(e.target.innerText == "Replay"){
        resetGame();
    }else{
        analyzeAnswer()
        if(questionMem.length<4){
            if(requiredIndex>=3){
                requiredIndex = 0;
            }else{
                requiredIndex += 1;
            }
            addQuestion(quizData[requiredIndex])
        }else{
            addWinner();
        }
}
}

document.getElementById("btn").addEventListener("click", handelClick)