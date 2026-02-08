"use strict";
function createInputNode(inputAttribute) {
    const inputNode = document.createElement("input");
    inputNode.setAttribute("type", inputAttribute.type);
    inputNode.setAttribute("name", inputAttribute.name);
    if ("id" in inputAttribute) {
        inputNode.setAttribute("id", inputAttribute.id);
    }
    if ("class" in inputAttribute) {
        inputNode.setAttribute("class", inputAttribute.class);
    }
    if ("value" in inputAttribute) {
        inputNode.setAttribute("value", inputAttribute.value);
    }
    return inputNode;
}
function createLabelNode(forInput) {
    const labelNode = document.createElement("label");
    labelNode.setAttribute("for", forInput);
    return labelNode;
}
function createFormObject() {
    const form = document.getElementById("selector-form");
    const formData = new FormData(form);
    const inputType = formData.get("tags") ?? "";
    const inputLable = formData.get("labels") ?? "";
    const inputID = formData.get("tagId") ?? "";
    const inputClass = formData.get("tagClass") ?? "";
    const inputName = formData.get("tagName") ?? "";
    const inputValue = formData.get("tagValue") ?? "";
    const formObject = {
        type: inputType,
        label: inputLable,
        id: inputID,
        name: inputName,
        value: inputValue,
        class: inputClass
    };
    return formObject;
}
function handelClick(event) {
    event.preventDefault();
    const formData = createFormObject();
    const inputAttributes = {
        type: formData.type,
        name: formData.name
    };
    if (formData.value != "") {
        inputAttributes.value = formData.value;
    }
    if (formData.class != "") {
        inputAttributes.class = formData.class;
    }
    if (formData.id != "") {
        inputAttributes.id = formData.id;
    }
    const inputNode = createInputNode(inputAttributes);
    const labelForAtriValue = formData.id != "" ? formData.id : formData.name;
    const labelNode = createLabelNode(labelForAtriValue);
    labelNode.innerText = formData.label;
    labelNode.appendChild(inputNode);
    const formPreveiewNode = document.getElementById("preview-form");
    if (formPreveiewNode == null) {
        throw new Error("Review form node is null");
    }
    formPreveiewNode.appendChild(labelNode);
    // console.log(formData.getAll("tags"));
    // console.log();
}
document.getElementById("addBtn")?.addEventListener("click", handelClick);
//# sourceMappingURL=index.js.map