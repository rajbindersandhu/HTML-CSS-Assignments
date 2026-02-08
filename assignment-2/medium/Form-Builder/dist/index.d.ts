type InputAttribute = {
    type: string;
    name: string;
    value?: string;
    id?: string;
    class?: string;
};
type FormObject = {
    [k in keyof InputAttribute]: FormDataEntryValue;
} & {
    label: FormDataEntryValue;
};
declare function createInputNode(inputAttribute: InputAttribute): HTMLInputElement;
declare function createLabelNode(forInput: string): HTMLLabelElement;
declare function createFormObject(): FormObject;
declare function handelClick(event: Event): void;
//# sourceMappingURL=index.d.ts.map