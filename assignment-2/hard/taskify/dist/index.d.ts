type Task = {
    "name": string;
    "description": string;
    "level": "Easy" | "Medium" | "Hard";
    "timeCreated": Date;
    "panel-level": "new-task" | "in-process" | "in-review" | "done";
    "id": string;
};
type Tasks = Task[];
declare let taskList: Tasks;
declare function createTaskNode(taskObjt: Task): HTMLElement;
declare function attachToPanel(panel: HTMLElement, task: Task): void;
declare function dragStartHandler(ev: DragEvent): void;
declare function dragOverHndler(ev: DragEvent): void;
declare function dropHandler(ev: DragEvent): void;
declare function addNewTask(): void;
declare function createTask(ev: Event): void;
declare function renderlist(): void;
//# sourceMappingURL=index.d.ts.map