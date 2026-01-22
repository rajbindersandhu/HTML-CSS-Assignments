console.log("hello");

let buttonList = document.querySelectorAll(".btn-container button");
for(let i=0;i<buttonList.length;i++){
    let btnId= buttonList[i].id
    let color = btnId.split("-")[0]
    if(color!="default"){
        document.getElementById(btnId).style.backgroundColor = color;
    }else{
        document.getElementById(btnId).style.backgroundColor = "gray";
    }
    document.getElementById(btnId).addEventListener("click", handelClick)
}

function handelClick(event){
    let btnId= event.target.id;
    let color = btnId.split("-")[0];
    if(color!="default"){
        document.getElementsByClassName("container")[0].style.backgroundColor = color;
        // document.getElementById("container").style.backgroundColor = color;
    }else{
        document.getElementsByClassName("container")[0].style.backgroundColor = "white";
    }
}