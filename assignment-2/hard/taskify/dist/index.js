"use strict";
let taskList = [
    {
        "name": "Todo1",
        "description": "This is first tod for testing",
        "level": "Easy",
        "timeCreated": new Date(),
        "panel-level": "new-task",
        "id": `task-0`
    }
];
function createTaskNode(taskObjt) {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "task-card");
    divContainer.setAttribute("draggable", "true");
    divContainer.setAttribute("id", taskObjt.id);
    const taskHeading = document.createElement("p");
    taskHeading.setAttribute("class", "task-heading");
    taskHeading.innerText = taskObjt.name;
    const taskDescription = document.createElement("p");
    taskDescription.setAttribute("class", "task-desc");
    taskDescription.innerText = taskObjt.description;
    const taskExtraInfo = document.createElement("div");
    taskExtraInfo.setAttribute("class", "task-extra-info");
    const taskLevel = document.createElement("div");
    taskLevel.setAttribute("class", "level-pill");
    taskLevel.innerText = taskObjt.level;
    if (taskObjt.level == "Easy") {
        taskLevel.style.backgroundColor = "green";
    }
    else if (taskObjt.level == "Medium") {
        // console.log("inside medium")
        taskLevel.style.backgroundColor = "yellow";
    }
    else if (taskObjt.level == "Hard") {
        // console.log("inside hard");
        taskLevel.style.backgroundColor = "red";
    }
    // console.log("Task level -> ",taskLevel);
    const taskTime = document.createElement("p");
    taskTime.setAttribute("class", "task-time");
    taskTime.innerText = taskObjt.timeCreated.toDateString();
    taskExtraInfo.appendChild(taskLevel);
    taskExtraInfo.appendChild(taskTime);
    divContainer.appendChild(taskHeading);
    divContainer.appendChild(taskDescription);
    divContainer.appendChild(taskExtraInfo);
    return divContainer;
}
function attachToPanel(panel, task) {
    if (!document.getElementById(task.id)) {
        const taskCard = createTaskNode(task);
        panel.appendChild(taskCard);
    }
}
function dragStartHandler(ev) {
    ev.stopPropagation();
    ev.dataTransfer?.setData("text/plain", ev.target.id);
}
function dragOverHndler(ev) {
    ev.preventDefault();
}
function dropHandler(ev) {
    const dragId = ev.dataTransfer?.getData("text/plain");
    if (!dragId) {
        throw new Error("drag class is not defined");
    }
    const dragNode = document.getElementById(dragId);
    if (!dragNode) {
        throw new Error("Drag node is null");
    }
    const targetId = ev.target.id;
    const dropNode = document.getElementById(targetId);
    if (!dropNode) {
        throw new Error("Drop node is null");
    }
    taskList = taskList.map(task => {
        if (task.id == dragId) {
            task.id = targetId;
        }
        return task;
    });
    dropNode.appendChild(dragNode);
}
function addNewTask() {
    const taskContainer = document.getElementById("task-container");
    if (!taskContainer) {
        throw new Error("task container is null");
    }
    taskContainer.style.display = "block";
    const panelContainer = document.getElementById("container");
    if (!panelContainer) {
        throw new Error("panel container is null");
    }
    panelContainer.style.display = "none";
}
// function clearForm(){
//     const formNode = document.getElementById("task-form");
// }
function createTask(ev) {
    ev.preventDefault();
    const formNode = document.getElementById("task-form");
    if (!formNode) {
        throw new Error("form node is null");
    }
    else if (!(formNode instanceof HTMLFormElement)) {
        throw new Error("form node is not instance of form element");
    }
    const formObjt = new FormData(formNode);
    const name = formObjt.get("name") ?? "";
    const desc = formObjt.get("description") ?? "";
    const level = formObjt.get("level") ?? "Easy";
    const taskTime = new Date();
    const id = `task-${taskList.length}`;
    const taskCreated = {
        "name": name,
        "description": desc,
        "level": level,
        "timeCreated": taskTime,
        "panel-level": "new-task",
        "id": id
    };
    taskList.push(taskCreated);
    const taskContainer = document.getElementById("task-container");
    if (!taskContainer) {
        throw new Error("task container is null");
    }
    taskContainer.style.display = "none";
    const panelContainer = document.getElementById("container");
    if (!panelContainer) {
        throw new Error("panel container is null");
    }
    panelContainer.style.display = "flex";
    formNode.reset();
    renderlist();
}
function renderlist() {
    console.log(taskList);
    for (let i = 0; i < taskList.length; i++) {
        let task = taskList[i];
        if (task == undefined) {
            throw new Error("task is undefined when attaching to panel");
        }
        const panelId = task["panel-level"];
        const panelNode = document.getElementById(`${panelId}-list`);
        // document.getElementById(panelId)
        if (!panelNode) {
            throw new Error("panelNode is not defined");
        }
        attachToPanel(panelNode, taskList[i]);
    }
    const taskCardCollection = document.getElementsByClassName("task-card");
    for (let i = 0; i < taskCardCollection.length; i++) {
        taskCardCollection.item(i)?.addEventListener("dragstart", dragStartHandler);
    }
    const panelCollection = document.getElementsByClassName("task-list");
    for (let i = 0; i < panelCollection.length; i++) {
        const panelNode = panelCollection.item(i);
        panelNode.addEventListener("dragover", dragOverHndler);
        panelNode.addEventListener("drop", dropHandler);
    }
}
renderlist();
document.getElementById("addBtn")?.addEventListener("click", addNewTask);
document.getElementById("create-task")?.addEventListener("click", createTask);
//# sourceMappingURL=index.js.map