
type InputAttribute = {
    type: string, 
    name: string,
    value?: string,
    id?: string,
    class?: string
}

type FormObject ={
    [k in keyof InputAttribute]: FormDataEntryValue
} & {label: FormDataEntryValue}

function createInputNode(inputAttribute: InputAttribute):HTMLInputElement{
    const inputNode: HTMLInputElement = document.createElement("input");
    inputNode.setAttribute("type", inputAttribute.type);
    inputNode.setAttribute("name", inputAttribute.name);
    if("id" in inputAttribute){
        inputNode.setAttribute("id", inputAttribute.id);
    }
    if("class" in inputAttribute){
        inputNode.setAttribute("class", inputAttribute.class);
    }
    if("value" in inputAttribute){
        inputNode.setAttribute("value", inputAttribute.value);
    }
    return inputNode
}

function createLabelNode(forInput:string):HTMLLabelElement{
    const labelNode:HTMLLabelElement = document.createElement("label");
    labelNode.setAttribute("for", forInput);
    return labelNode;
}

function createFormObject(): FormObject{
    const form:HTMLFormElement = <HTMLFormElement>document.getElementById("selector-form");
    const formData = new FormData(form);
    const inputType= formData.get("tags") ?? "";
    const inputLable= formData.get("labels") ?? "";
    const inputID= formData.get("tagId") ?? "";
    const inputClass= formData.get("tagClass") ?? "";
    const inputName = formData.get("tagName") ?? "";
    const inputValue = formData.get("tagValue") ?? "";

    const formObject:FormObject = {
        type:inputType,
        label:inputLable,
        id: inputID,
        name: inputName,
        value: inputValue,
        class: inputClass
    }

    return formObject;
}

function handelClick(event:Event):void{
    event.preventDefault();
    const formData: FormObject = createFormObject();
    const inputAttributes: InputAttribute = {
        type: <string>formData.type,
        name: <string>formData.name
    }
    if (formData.value!=""){
        inputAttributes.value = <string>formData.value;
    }
    if(formData.class != ""){
        inputAttributes.class = <string>formData.class;
    }
    if(formData.id != ""){
        inputAttributes.id = <string>formData.id;
    }
    const inputNode: HTMLInputElement = createInputNode(inputAttributes);
    const labelForAtriValue: string = formData.id != "" ? <string>formData.id : <string>formData.name;
    const labelNode: HTMLLabelElement = createLabelNode(labelForAtriValue);
    labelNode.innerText = <string>formData.label
    labelNode.appendChild(inputNode);
    const formPreveiewNode: HTMLElement | null = document.getElementById("preview-form");
    if(formPreveiewNode == null){
        throw new Error("Review form node is null")
    }
    formPreveiewNode.appendChild(labelNode);
    // console.log(formData.getAll("tags"));
    // console.log();
}

document.getElementById("addBtn")?.addEventListener("click", handelClick);
